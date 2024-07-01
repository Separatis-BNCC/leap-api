import { RequestHandler } from "express";
import { errInternalServer, successRes } from "../utils";
import { Credential, Profile } from "../models";
import { Op } from "sequelize";

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const data = await Credential.findAll({
      attributes: ["email", "role"],
      include: {
        as: "profile",
        model: Profile,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
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
    console.log(err);
    return errInternalServer(next);
  }
};
