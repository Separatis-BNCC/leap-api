import { RequestHandler } from "express";
import {
  errBadRequest,
  errInternalServer,
  errNotFound,
  successRes,
} from "../utils";
import { Class, Course } from "../models";
import { ValidationError } from "sequelize";

export const createClass: RequestHandler = async (req, res, next) => {
  try {
    const { course_id } = req.body;

    const isCourseExist = await Course.findByPk(course_id);

    if (!isCourseExist)
      return errNotFound(next, `Course with id ${course_id} not found!`);

    const { name, day_of_week, hour, minute } = req.body;

    const data = await Class.create({
      name,
      day_of_week,
      hour,
      minute,
      course_id,
    });

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
