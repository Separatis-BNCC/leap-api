import { RequestHandler } from "express";
import {
  errNotFound,
  errInternalServer,
  successRes,
} from "../utils";
import { Credential, Profile } from "../models";

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
        }
      }
    });

    return successRes(res, data);
  } catch (err: any) {
    return errInternalServer(next);
  }
};
