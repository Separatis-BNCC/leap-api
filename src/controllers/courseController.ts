import { RequestHandler } from "express";
import { errBadRequest, errInternalServer, successRes } from "../utils";
import { Course, Class } from "../models";
import { ValidationError } from "sequelize";

export const createCourse: RequestHandler = async (req, res, next) => {
  try {
    const { name, region } = req.body;

    const data = await Course.create({
      name,
      region,
    });

    return successRes(res, {
      name: data.name,
      region: data.region,
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
      include: {
        as: "classes",
        model: Class,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        }
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    return successRes(res, data);
  } catch (err: any) {
    return errInternalServer(next);
  }
};