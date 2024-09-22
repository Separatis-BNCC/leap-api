import { RequestHandler } from "express";
import { errBadRequest, errInternalServer, successRes } from "../utils";
import { Class, Credential, Profile, Session } from "../models";
import { Op, Sequelize, ValidationError } from "sequelize";

export const getMemberProfile: RequestHandler = async (req, res, next) => {
  try {
    const user = JSON.parse(req.headers.user as string);

    const data = await Credential.findOne({
      where: {
        id: user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
      include: {
        as: "profile",
        model: Profile,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    return successRes(res, data);
  } catch (err: any) {
    return errInternalServer(next);
  }
};

export const editMemberProfile: RequestHandler = async (req, res, next) => {
  try {
    type UpdatedFields = {
      first_name?: string;
      last_name?: string;
      nim?: string;
      birth_date?: Date;
      region?: number;
      faculty?: number;
      major?: number;
      line_id?: string;
    };

    const user = JSON.parse(req.headers.user as string);
    const payload = req.body as UpdatedFields;

    const data = await Profile.update(payload, {
      where: {
        id: user.id,
      },
    });

    return successRes(res, `Success edit profile with id ${user.id}!`);
  } catch (err: any) {
    if ((err.name = "SequelizeValidationError")) {
      const errors = err.errors?.map((error: ValidationError) => error.message);

      return errBadRequest(next, errors);
    }

    return errInternalServer(next);
  }
};

export const getMemberDashboard: RequestHandler = async (req, res, next) => {
  try {
    const user = JSON.parse(req.headers.user as string);

    const data = await Credential.findOne({
      where: {
        id: user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
      include: [
        {
          as: "classes",
          model: Class,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          through: {
            attributes: [],
          },
          include: [
            {
              as: "sessions",
              model: Session,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
              through: {
                where: {
                  schedule: {
                    [Op.gt]: new Date(),
                    [Op.ne]: null,
                  },
                },
                attributes: ["id"],
              },
            },
          ],
        },
      ],
      order: [["classes", "sessions", "week", "ASC"]],
    }).then((res) => res?.toJSON());

    return successRes(res, {
      ...data,
      classes: data?.classes?.map((classItem) => ({
        ...classItem,
        sessions: classItem.sessions[0],
      })),
    });
  } catch (err: any) {
    return errInternalServer(next);
  }
};
