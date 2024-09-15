import { RequestHandler } from "express";
import {
  errBadRequest,
  errInternalServer,
  errNotFound,
  successRes,
} from "../utils";
import { ValidationError } from "sequelize";
import { ClassSession, Attendance } from "../models";


export const createAttendance: RequestHandler = async (req, res, next) => {
  try {
    const { class_session_id } = req.body;
    const user = JSON.parse(req.headers.user as string);

    const classSessionData = await ClassSession.findByPk(class_session_id);

    if (!classSessionData)
      return errNotFound(
        next,
        `Class session with id ${class_session_id} not found!`
      );

    const isDuplicate = await Attendance.findOne({
      where: {
        credential_id: user.id,
        class_session_id,
      },
    });
    if (isDuplicate)
      return errBadRequest(
        next,
        `Attendence with user id ${user.id} and session ${class_session_id} already exist!`
      );

    const { proof } = req.body;
    // const uploadResult = await cloudinary.uploader.upload(proof);

    const data = await Attendance.create({
      proof,
      credential_id: user.id,
      class_session_id,
    });

    return successRes(res, {
      approved: data.approved,
      proof: data.proof,
      credential_id: data.credential_id,
      class_session_id: data.class_session_id,
    });
  } catch (err: any) {
    if ((err.name = "SequelizeValidationError")) {
      const errors = err.errors?.map((error: ValidationError) => error.message);

      return errBadRequest(next, errors);
    }

    return errInternalServer(next);
  }
};

export const getAttendance: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Attendance.findOne({
      where: {
        id,
      },
      attributes: {
        include: ["id", "approved"],
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!data)
      return errNotFound(next, `Attendance with id ${id} does not exist!`);

    return successRes(res, data);
  } catch (err: any) {
    return errInternalServer(next);
  }
};

export const editAttendance: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isAttendanceExist = await Attendance.findByPk(id);

    if (!isAttendanceExist)
      return errNotFound(next, `Attendance with id ${id} not found!`);

    const { proof } = req.body;

    const data = await Attendance.update(
      {
        proof,
      },
      {
        where: {
          id,
        },
      }
    );

    if (!data[0])
      return errBadRequest(
        next,
        `Failed to update Attendance with the id ${id}`
      );

    return successRes(res, `Attendance updated!`);
  } catch (err: any) {
    if ((err.name = "SequelizeValidationError")) {
      const errors = err.errors?.map((error: ValidationError) => error.message);

      return errBadRequest(next, errors);
    }

    return errInternalServer(next);
  }
};
