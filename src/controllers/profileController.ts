import { RequestHandler } from "express";
import { errBadRequest, errInternalServer, successRes } from "../utils";
import { Profile } from "../models";
import { ValidationError } from "sequelize";

export const createProfile: RequestHandler = async (req, res, next) => {
  try {
    const { id } = JSON.parse(req.headers.user as string);

    const {
      first_name,
      last_name,
      nim,
      birth_date,
      region,
      faculty,
      major,
      line_id,
    } = req.body;

    const data = await Profile.create({
      id,
      first_name,
      last_name,
      nim,
      birth_date,
      region,
      faculty,
      major,
      line_id,
    });

    return successRes(res, {
      first_name: data.first_name,
      last_name: data.last_name,
      nim: data.nim,
      birth_date: data.birth_date,
      region: data.region,
      faculty: data.faculty,
      major: data.major,
      line_id: data.line_id,
    });
  } catch (err: any) {
    if ((err.name = "SequelizeValidationError")) {
      const errors = err.errors?.map((error: ValidationError) => error.message);

      return errBadRequest(next, errors);
    }

    return errInternalServer(next);
  }
};
