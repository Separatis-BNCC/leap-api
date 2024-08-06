import { RequestHandler } from "express";
import {
  errBadRequest,
  errInternalServer,
  errNotFound,
  successRes,
} from "../utils";
import { Content, Session } from "../models";
import { ValidationError } from "sequelize";

export const createContent: RequestHandler = async (req, res, next) => {
  try {
    const { session_id } = req.body;

    const session = await Session.findOne({
      where: {
        id: session_id,
      },
    });

    if (!session)
      return errNotFound(next, `Content with id ${session_id} not found!`);

    const { content_type, url, desc } = req.body;

    const data = await Content.create({
      content_type,
      url,
      desc,
      session_id,
    });

    return successRes(res, {
      content_type: data.content_type,
      url: data.url,
      desc: data.desc,
      id: data.id,
      session_id: data.session_id,
    });
  } catch (err: any) {
    if ((err.name = "SequelizeValidationError")) {
      const errors = err.errors?.map((error: ValidationError) => error.message);

      return errBadRequest(next, errors);
    }

    return errInternalServer(next);
  }
};

export const getContent: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Content.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!data)
      return errNotFound(next, `Content with id ${id} does not exist!`);

    return successRes(res, data);
  } catch (err: any) {
    return errInternalServer(next);
  }
};

export const editContent: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isContentExist = await Content.findByPk(id);

    if (!isContentExist)
      return errNotFound(next, `Content with id ${id} not found!`);

    const { content_type, url, desc } = req.body;

    const data = await Content.update(
      {
        content_type,
        url,
        desc,
      },
      {
        where: {
          id,
        },
      }
    );

    if (!data[0])
      return errNotFound(next, `Content with id ${id} does not exist!`);

    return successRes(res, `Content updated!`);
  } catch (err: any) {
    if ((err.name = "SequelizeValidationError")) {
      const errors = err.errors?.map((error: ValidationError) => error.message);

      return errBadRequest(next, errors);
    }

    return errInternalServer(next);
  }
};

export const deleteContent: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const content = await Content.destroy({
      where: {
        id,
      },
    });

    if (!content)
      return errNotFound(next, `Content with id ${id} does not exist!`);

    return successRes(res, `Content with id ${id} deleted successfully!`);
  } catch (err: any) {
    return errInternalServer(next);
  }
};
