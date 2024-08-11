import { RequestHandler } from "express";
import {
  errBadRequest,
  errInternalServer,
  errNotFound,
  successRes,
} from "../utils";
import { Assignment, Course } from "../models";
import { ValidationError } from "sequelize";

export const createAssignment: RequestHandler = async (req, res, next) => {
  try {
    const { course_id } = req.body;

    const course = await Course.findOne({
      where: {
        id: course_id,
      },
    });

    if (!course)
      return errNotFound(next, `Course with id ${course_id} not found!`);

    const { url, deadline, status } = req.body;

    const data = await Assignment.create({
      url,
      deadline,
      status,
      course_id,
    });

    return successRes(res, {
      id: data.id,
      url: data.url,
      deadline: data.deadline,
      status: data.status,
      course_id: data.course_id,
    });
  } catch (err: any) {
    if ((err.name = "SequelizeValidationError")) {
      const errors = err.errors?.map((error: ValidationError) => error.message);

      return errBadRequest(next, errors);
    }

    return errInternalServer(next);
  }
};

export const getAssignment: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Assignment.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!data)
      return errNotFound(next, `Assignment with id ${id} does not exist!`);

    return successRes(res, data);
  } catch (err: any) {
    return errInternalServer(next);
  }
};

export const editAssignment: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isAssignmentExist = await Assignment.findByPk(id);

    if (!isAssignmentExist)
      return errNotFound(next, `Assignment with id ${id} not found!`);

    const { url, deadline, status, course_id } = req.body;

    const data = await Assignment.update(
      {
        url,
        deadline,
        status,
        course_id,
      },
      {
        where: {
          id,
        },
      }
    );

    if (!data[0])
      return errNotFound(next, `Assignment with id ${id} does not exist!`);

    return successRes(res, `Assignment updated!`);
  } catch (err: any) {
    if ((err.name = "SequelizeValidationError")) {
      const errors = err.errors?.map((error: ValidationError) => error.message);

      return errBadRequest(next, errors);
    }

    return errInternalServer(next);
  }
};

export const deleteAssignment: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;

        const assignment = await Assignment.destroy({
            where: {
                id,
            },
        });

        if (!assignment)
            return errNotFound(next, `Assignment with id ${id} does not exist!`);

        return successRes(res, `Assignment with id ${id} deleted successfully!`);
    } catch (err: any) {
        return errInternalServer(next);
    }
};
