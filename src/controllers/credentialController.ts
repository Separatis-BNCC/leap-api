import { NextFunction, Request, RequestHandler, Response } from "express";
import { Credential } from "../models";
import { ValidationError } from "sequelize";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errBadRequest, errInternalServer, successRes } from "../utils";

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { admin } = req.query;

    if (admin) {
      const isExist = await Credential.count({
        where: {
          role: 1,
        },
      });

      if (isExist)
        return errBadRequest(next, "Can't resgister more than one admin!");
    }

    const { email, password } = await req.body;

    const data = await Credential.create({
      email,
      password,
      role: admin ? 1 : 4,
    });

    const token = jwt.sign(
      {
        email: data.email,
        role: data.role,
      },
      process.env.JWT_KEY || ""
    );

    return successRes(res, {
      email: data.email,
      role: data.role,
      token,
    });
  } catch (err: any) {
    if ((err.name = "SequelizeValidationError")) {
      const errors = err.errors?.map((error: ValidationError) => error.message);

      return errBadRequest(next, errors);
    }

    return errInternalServer(next);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = await req.body;

    const data = await Credential.findOne({
      where: {
        email,
      },
      attributes: ["password", "email", "role"],
    });

    if (!data) return errBadRequest(next, "Invalid email or password!");

    if (!bcryptjs.compareSync(password, data.password))
      return errBadRequest(next, "Invalid email or password!");

    const token = jwt.sign(
      {
        email: data.email,
        role: data.role,
      },
      process.env.JWT_KEY || ""
    );

    return successRes(res, {
      email: data.email,
      role: data.role,
      token,
    });
  } catch (err) {
    return errInternalServer(next);
  }
};
