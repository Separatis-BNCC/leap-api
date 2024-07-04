import { RequestHandler } from "express";
import {
  errBadRequest,
  errInternalServer,
  errNotFound,
  successRes,
} from "../utils";
import { Credential, Profile } from "../models";
import { Op } from "sequelize";

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const data = await Credential.findAll({
      attributes: ["id", "email", "role"],
      include: {
        as: "profile",
        model: Profile,
        attributes: {
          exclude: ["createdAt", "updatedAt", "id"],
        },
      },
      where: {
        role: {
          [Op.not]: 1,
        },
      },
    });

    return successRes(res, data);
  } catch (err) {
    return errInternalServer(next);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Credential.findOne({
      attributes: ["id", "email", "role"],
      include: {
        as: "profile",
        model: Profile,
        attributes: {
          exclude: ["createdAt", "updatedAt", "id"],
        },
      },
      where: {
        id,
      },
    });

    if (!data) return errNotFound(next, `User with id ${id} not found`);

    return successRes(res, data);
  } catch (err) {
    return errInternalServer(next);
  }
};

export const changeUserRole: RequestHandler = async (req, res, next) => {
  try {
    const { ids } = req.body;
    const { role } = req.body;

    const users = await Credential.findAll({
      where: {
        id: ids,
      },
    });

    if (users.length !== ids.length)
      return errBadRequest(next, "Some ids are invalid!");

    const data = await Credential.update(
      { role },
      {
        where: {
          id: ids,
        },
      }
    );

    return successRes(res, data);
  } catch (err) {
    return errInternalServer(next);
  }
};

export const changeUserActiveStatus: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { ids } = req.body;
    const { active } = req.body;

    const users = await Credential.findAll({
      where: {
        id: ids,
      },
    });

    if (users.length !== ids.length)
      return errBadRequest(next, "Some ids are invalid!");

    const data = await Credential.update(
      { active },
      {
        where: {
          id: ids,
        },
      }
    );

    return successRes(res, data);
  } catch (err) {
    return errInternalServer(next);
  }
};
