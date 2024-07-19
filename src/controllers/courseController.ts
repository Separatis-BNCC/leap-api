import { RequestHandler } from "express";
import {
  errBadRequest,
  errInternalServer,
  errNotFound,
  successRes,
} from "../utils";
import { Course, Class, Session } from "../models";
import { ValidationError } from "sequelize";

export const createCourse: RequestHandler = async (req, res, next) => {
  try {
    const { name, region } = req.body;

    const data = await Course.create({
      name,
      region,
    });

    const seedSessionsData = [];

    for (let i = 0; i < data.total_sessions; i++) {
      seedSessionsData.push({
        week: i + 1,
        description: `${data.name} week ${i + 1} description`,
        course_id: data.id,
      });
    }

    await Session.bulkCreate(seedSessionsData);

    return successRes(res, {
      name: data.name,
      region: data.region,
      id: data.id,
    });
  } catch (err: any) {
    if ((err.name = "SequelizeValidationError")) {
      const errors = err.errors?.map((error: ValidationError) => error.message);

      return errBadRequest(next, errors);
    }

    return errInternalServer(next);
  }
};

export const getCourses: RequestHandler = async (req, res, next) => {
  try {
    const data = await Course.findAll({
      include: [
        {
          as: "classes",
          model: Class,
          attributes: {
            exclude: ["createdAt", "updatedAt", "course_id"],
          },
        },
        {
          as: "sessions",
          model: Session,
          attributes: {
            exclude: ["createdAt", "updatedAt", "course_id"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    return successRes(res, data);
  } catch (err: any) {
    console.log(err);
    return errInternalServer(next);
  }
};

export const getCourse: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Course.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          as: "classes",
          model: Class,
          attributes: {
            exclude: ["createdAt", "updatedAt", "course_id"],
          },
        },
        {
          as: "sessions",
          model: Session,
          attributes: {
            exclude: ["createdAt", "updatedAt", "course_id"],
          },
        },
      ],
    });

    if (!data) return errNotFound(next, `Course with id ${id} does not exist!`);

    return successRes(res, data);
  } catch (err) {
    return errInternalServer(next);
  }
};

export const editCourse: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findByPk(id);

    if (!course)
      return errNotFound(next, `Course with id ${id} does not exist!`);

    const { name, region } = req.body;

    const data = await Course.update(
      {
        name,
        region,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return successRes(res, data);
  } catch (err: any) {
    if ((err.name = "SequelizeValidationError")) {
      const errors = err.errors?.map((error: ValidationError) => error.message);

      return errBadRequest(next, errors);
    }

    return errInternalServer(next);
  }
};

export const changeCourseStatus: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const data = await Course.update(
      {
        status,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (!data[0])
      return errNotFound(next, `Course with id ${id} does not exist!`);

    return successRes(res, data);
  } catch (err: any) {
    if ((err.name = "SequelizeValidationError")) {
      const errors = err.errors?.map((error: ValidationError) => error.message);

      return errBadRequest(next, errors);
    }

    return errInternalServer(next);
  }
};

export const deleteCourse: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Course.destroy({
      where: {
        id,
      },
    });

    if (!data) return errNotFound(next, `Course with id ${id} does not exist!`);

    return successRes(res, `Course with id ${id} deleted successfully!`);
  } catch (err) {
    return errInternalServer(next);
  }
};
