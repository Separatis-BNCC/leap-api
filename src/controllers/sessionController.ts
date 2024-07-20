import { RequestHandler } from "express";
import {
  errBadRequest,
  errInternalServer,
  errNotFound,
  successRes,
} from "../utils";
import { Session } from "../models";
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
