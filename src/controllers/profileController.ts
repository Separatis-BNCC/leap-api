import { RequestHandler } from "express";
import {
  errBadRequest,
  errInternalServer,
  successRes,
  errNotFound,
} from "../utils";
import { Profile } from "../models";
import { ValidationError } from "sequelize";
import options from "../assets/options";

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

export const getRegions: RequestHandler = async (req, res, next) => {
  try {
    const data = options.regions.map((region) => {
      return { id: region.id, label: region.label };
    });

    return successRes(res, data);
  } catch (err: any) {
    return errInternalServer(next);
  }
};

export const getFaculties: RequestHandler = async (req, res, next) => {
  try {
    const { regionId } = req.params;

    const selectedRegion = options.regions.find(
      (region) => region.id === Number(regionId)
    );

    if (!selectedRegion)
      return errNotFound(next, `Region with id ${regionId} does not exist`);

    const data = selectedRegion?.faculties.map((faculty) => {
      return { id: faculty.id, label: faculty.label };
    });

    return successRes(res, data);
  } catch (err: any) {
    return errInternalServer(next);
  }
};

export const getMajors: RequestHandler = async (req, res, next) => {
  try {
    const { regionId, facultyId } = req.params;

    const selectedRegion = options.regions.find(
      (region) => region.id === Number(regionId)
    );

    if (!selectedRegion)
      return errNotFound(next, `Region with id ${regionId} does not exist`);

    const selectedFaculty = selectedRegion?.faculties.find(
      (faculty) => faculty.id === Number(facultyId)
    );

    if (!selectedFaculty)
      return errNotFound(next, `Faculty with id ${facultyId} does not exist`);

    const data = selectedFaculty?.majors.map((major) => {
      return { id: major.id, label: major.label };
    });

    return successRes(res, data);
  } catch (err: any) {
    return errInternalServer(next);
  }
};
