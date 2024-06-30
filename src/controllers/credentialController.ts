import { NextFunction, Request, Response } from "express";
import { Credential } from "../models";
import { ValidationError } from "sequelize";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { successRes } from "../utils";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { admin } = req.query;

    if (admin) {
      const isExist = await Credential.count({
        where: {
          role: 1,
        },
      });

      if (isExist)
        return next({
          status: 400,
          msg: "Can't resgister more than one admin!",
        });
    }

    const { username, email, password } = await req.body;

    const data = await Credential.create({
      username,
      email,
      password,
      role: admin ? 1 : 4,
    });

    const token = jwt.sign(
      {
        email: data.email,
        role: data.role,
        username: data.username,
      },
      process.env.JWT_KEY || ""
    );

    return successRes(res, {
      email: data.email,
      role: data.role,
      username: data.username,
      token,
    });
  } catch (err: any) {
    if ((err.name = "SequelizeValidationError")) {
      const errors = err.errors?.map((error: ValidationError) => error.message);

      return next({
        status: 400,
        msg: errors,
      });
    }

    return next({
      status: 500,
      msg: "Server error!",
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = await req.body;

    const data = await Credential.findOne({
      where: {
        username,
      },
      attributes: ["username", "password", "email", "role"],
    });

    if (!data)
      return next({
        status: 400,
        msg: "Invalid username or password!",
      });

    if (!bcryptjs.compareSync(password, data.password))
      return next({
        status: 400,
        msg: "Invalid username or password!",
      });

    const token = jwt.sign(
      {
        email: data.email,
        role: data.role,
        username: data.username,
      },
      process.env.JWT_KEY || ""
    );

    return successRes(res, {
      email: data.email,
      role: data.role,
      username: data.username,
      token,
    });
  } catch (err) {
    return next({
      status: 500,
      msg: "Server error!",
    });
  }
};
