import { RequestHandler } from "express";
import {
  errBadRequest,
  errInternalServer,
  errNotFound,
  successRes,
} from "../utils";
import { Course, Session } from "../models";
import { ValidationError } from "sequelize";

export const getSession: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Session.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!data)
      return errNotFound(next, `Session with id ${id} does not exist!`);

    return successRes(res, data);
  } catch (err: any) {
    return errInternalServer(next);
  }
};

export const createSession: RequestHandler = async (req, res, next) => {
  try {
    const { course_id } = req.body;

    const course = await Course.findByPk(course_id);

    if (!course)
      return errNotFound(next, `Course with id ${course_id} does not exist!`);

    const { week, description } = req.body;

    const data = await Session.create({
      week,
      description,
      course_id,
    });

    return successRes(res, {
      week: data.week,
      description: data.description,
      course_id: data.course_id,
      status: data.status,
    });
  } catch (err: any) {
    if ((err.name = "SequelizeValidationError")) {
      const errors = err.errors?.map((error: ValidationError) => error.message);

      return errBadRequest(next, errors);
    }

    return errInternalServer(next);
  }
};

export const editSession: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const session = await Session.findByPk(id);
    if (!session)
      return errNotFound(next, `Session with id ${id} does not exis!t`);

    const { week, description } = req.body;

    const data = await Session.update(
      {
        week,
        description,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (!data[0])
      return errNotFound(next, `Session with id ${id} does not exist!`);

    return successRes(res, `Session updated!`);
  } catch (err: any) {
    if ((err.name = "SequelizeValidationError")) {
      const errors = err.errors?.map((error: ValidationError) => error.message);

      return errBadRequest(next, errors);
    }

    return errInternalServer(next);
  }
};

export const deleteSession: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Session.destroy({
      where: {
        id: id,
      },
    });

    if (!data)
      return errNotFound(next, `Session with id ${id} does not exist!`);

    return successRes(res, `Session with id ${id} deleted successfully!`);
  } catch (err: any) {
    return errInternalServer(next);
  }
};
