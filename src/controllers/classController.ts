import { RequestHandler } from "express";
import {
  errBadRequest,
  errInternalServer,
  errNotFound,
  successRes,
} from "../utils";
import {
  Class,
  Course,
  Session,
  Credential,
  Profile,
  Assignment,
} from "../models";
import { QueryTypes, ValidationError } from "sequelize";
import ClassSession from "../models/classSession";
import MemberClass from "../models/memberClass";
import sequelize from "../models/connection";

export const createClass: RequestHandler = async (req, res, next) => {
  try {
    const { course_id } = req.body;

    const course = await Course.findOne({
      where: {
        id: course_id,
      },
      include: {
        as: "sessions",
        model: Session,
        attributes: ["id"],
      },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "name",
          "region",
          "total_sessions",
          "status",
        ],
      },
    });

    if (!course)
      return errNotFound(next, `Course with id ${course_id} not found!`);

    const { name, day_of_week, hour, minute } = req.body;

    const data = await Class.create({
      name,
      day_of_week,
      hour,
      minute,
      course_id,
    });

    const seedClassSessionsData = course.sessions.map(
      ({ id }: { id: number }) => ({
        class_id: data.id,
        session_id: id,
      })
    );

    await ClassSession.bulkCreate(seedClassSessionsData);

    return successRes(res, {
      id: data.id,
      name: data.name,
      day_of_week: data.day_of_week,
      hour: data.hour,
      minute: data.minute,
    });
  } catch (err: any) {
    if ((err.name = "SequelizeValidationError")) {
      const errors = err.errors?.map((error: ValidationError) => error.message);

      return errBadRequest(next, errors);
    }

    return errInternalServer(next);
  }
};

export const editClass: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isClassExist = await Class.findByPk(id);

    if (!isClassExist)
      return errNotFound(next, `Class with id ${id} not found!`);

    const { name, day_of_week, hour, minute } = req.body;

    const data = await Class.update(
      {
        name,
        day_of_week,
        hour,
        minute,
      },
      {
        where: {
          id,
        },
      }
    );

    if (!data[0])
      return errNotFound(next, `Class with id ${id} does not exist!`);

    return successRes(res, `Success edit class with id ${id}!`);
  } catch (err: any) {
    if ((err.name = "SequelizeValidationError")) {
      const errors = err.errors?.map((error: ValidationError) => error.message);

      return errBadRequest(next, errors);
    }

    return errInternalServer(next);
  }
};

export const getClasses: RequestHandler = async (req, res, next) => {
  try {
    let data = await sequelize.query(
      `select
        c.id,
        hour,
        minute,
        day_of_week,
        c.name as name,
        count(c.id) as member_count,
        co.name as "course.name"
      from
        "Classes" as c
        join "MemberClasses" as m on c.id = m.class_id
        join "Courses" as co on c.course_id = co.id
      group by
        c.id, co.name`,
      {
        type: QueryTypes.SELECT,
      }
    );

    data = data.map((xClass: any) => {
      xClass.course = { name: xClass["course.name"] };
      delete xClass["course.name"];

      return xClass;
    });

    return successRes(res, data);
  } catch (err: any) {
    return errInternalServer(next);
  }
};

export const getClassById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Class.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          as: "members",
          model: Credential,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
          include: [
            {
              as: "profile",
              model: Profile,
            },
          ],
          through: {
            attributes: [],
          },
        },
        {
          as: "courses",
          model: Course,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              as: "assignments",
              model: Assignment,
              attributes: ["id"],
            },
          ],
        },
        {
          as: "sessions",
          model: Session,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!data) return errNotFound(next, `Course with id ${id} does not exist!`);

    return successRes(res, data);
  } catch (err: any) {
    return errInternalServer(next);
  }
};

export const deleteClass: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Class.destroy({
      where: {
        id,
      },
    });

    if (!data) return errNotFound(next, `Class with id ${id} does not exist!`);

    return successRes(res, `Course with id ${id} deleted successfully!`);
  } catch (err: any) {
    return errInternalServer(next);
  }
};

export const addMembers: RequestHandler = async (req, res, next) => {
  try {
    const { class_id } = req.params;
    const { ids } = req.body;

    const isClassExist = await Class.findOne({
      where: {
        id: class_id,
      },
      attributes: ["id"],
      include: {
        model: Credential,
        as: "members",
        attributes: ["id"],
        through: {
          attributes: [],
          where: {
            credential_id: ids,
          },
        },
      },
    });

    if (!isClassExist)
      return errNotFound(next, `Class with id ${class_id} not found!`);

    const { members } = isClassExist;

    const validatedUsers = await Credential.findAll({
      where: {
        id: ids,
      },
      attributes: ["id"],
    });

    const seedMemberClass: {
      class_id: number;
      credential_id: number;
      is_praetorian: boolean;
    }[] = [];

    const validatedUsersId = new Set(validatedUsers.map((user) => user.id));
    const notFoundId = ids.filter((id: number) => !validatedUsersId.has(id));

    const existingMember = [];
    const membersId = new Set(members.map((member) => member.id));

    for (let i = 0; i < validatedUsers.length; i++) {
      const { id } = validatedUsers[i];

      const isUserMemberOfClass = membersId.has(id);

      if (!isUserMemberOfClass) {
        seedMemberClass.push({
          class_id: Number(class_id),
          credential_id: id,
          is_praetorian: false,
        });
      } else {
        existingMember.push(id);
      }
    }

    await MemberClass.bulkCreate(seedMemberClass);

    const msg: {
      warningMsg?: string[];
      successMsg?: string;
    } = {};

    if (notFoundId.length > 0)
      msg.warningMsg = [`Members with id ${notFoundId.join(", ")} not found!`];

    if (existingMember.length > 0) {
      const existingMemberMsg = `Members with id ${existingMember.join(
        ", "
      )} already in class with id ${class_id}`;
      if (msg.warningMsg ? msg.warningMsg.length > 0 : false) {
        msg.warningMsg?.push(existingMemberMsg);
      } else {
        msg.warningMsg = [existingMemberMsg];
      }
    }

    if (seedMemberClass.length > 0)
      msg.successMsg = `Success add member with id ${seedMemberClass
        .map((member) => member.credential_id)
        .join(", ")} to class with id ${class_id}`;

    return successRes(res, msg);
  } catch (err: any) {
    return errInternalServer(next);
  }
};

export const addPraetorian: RequestHandler = async (req, res, next) => {
  try {
    const { class_id } = req.params;

    const isClassExist = await Class.findOne({
      where: {
        id: class_id,
      },
      attributes: ["id"],
      include: {
        model: Credential,
        as: "members",
        attributes: ["id"],
        through: {
          where: {
            is_praetorian: true,
          },
          attributes: [],
        },
      },
    });

    if (!isClassExist)
      return errNotFound(next, `Class with id ${class_id} not found!`);

    if (isClassExist.members.length > 0)
      return errBadRequest(next, `This class already have a praetorian!`);

    const { id } = req.body;

    const validatedUser = await Credential.findOne({
      where: {
        id,
      },
      attributes: ["id", "role"],
      include: {
        model: Class,
        as: "classes",
        attributes: ["id"],
        through: {
          attributes: [],
          where: {
            class_id,
          },
        },
      },
    });

    if (!validatedUser)
      return errNotFound(next, `User with id ${id} not found!`);

    if (validatedUser.classes.length > 0)
      return errBadRequest(
        next,
        `This user is a member of class with id ${class_id}!`
      );

    if (validatedUser.role !== 2)
      return errBadRequest(next, `User with id ${id} is not a praetorian!`);

    await MemberClass.create({
      class_id: Number(class_id),
      credential_id: id,
      is_praetorian: true,
    });

    return successRes(
      res,
      `Success add praetorian to class with id ${class_id}`
    );
  } catch (err: any) {
    return errInternalServer(next);
  }
};

export const removeMember: RequestHandler = async (req, res, next) => {
  try {
    const { class_id, id } = req.params;

    const isClassExist = await Class.findOne({
      where: {
        id: class_id,
      },
      attributes: ["id"],
      include: {
        model: Credential,
        as: "members",
        attributes: ["id"],
        through: {
          attributes: ["id"],
          where: {
            credential_id: id,
            is_praetorian: false,
          },
        },
      },
    });

    if (!isClassExist)
      return errNotFound(next, `Class with id ${class_id} not found!`);

    if (isClassExist.members.length < 1)
      return errNotFound(
        next,
        `Member with id ${id} is not a member of class with id ${class_id}!`
      );

    await MemberClass.destroy({
      where: {
        id: isClassExist.members[0].MemberClass.id,
      },
    });

    return successRes(
      res,
      `Success remove member with id ${id} from class with id ${class_id}!`
    );
  } catch (err: any) {
    return errInternalServer(next);
  }
};

export const removePraetorian: RequestHandler = async (req, res, next) => {
  try {
    const { class_id, id } = req.params;

    const isClassExist = await Class.findOne({
      where: {
        id: class_id,
      },
      attributes: ["id"],
      include: {
        model: Credential,
        as: "members",
        attributes: ["id"],
        through: {
          attributes: [],
          where: {
            credential_id: id,
            is_praetorian: true,
          },
        },
      },
    });

    if (!isClassExist)
      return errNotFound(next, `Class with id ${class_id} not found!`);

    if (isClassExist.members.length < 1)
      return errBadRequest(
        next,
        `Praetorian with id ${id} not exist for class with id ${id}!`
      );

    return successRes(
      res,
      `Success remove praetorian with id ${id} from class with id ${class_id}!`
    );
  } catch (err: any) {
    return errInternalServer(next);
  }
};
