import { RequestHandler } from "express";
import {
  errInternalServer,
  errUnauthenticated,
  errUnauthorized,
} from "../utils";
import jwt from "jsonwebtoken";
import { Credential } from "../models";

export const authenticationMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return errUnauthenticated(next);

    const user: any = jwt.verify(
      authorization.split(" ")[1],
      process.env.JWT_KEY || ""
    );

    const isValid = await Credential.findOne({ where: { email: user.email } });

    if (!isValid) return errUnauthenticated(next);

    req.headers.user = JSON.stringify({
      email: isValid.email,
      role: isValid.role,
    });

    return next();
  } catch (err: any) {
    if (err.name === "JsonWebTokenError") return errUnauthenticated(next);

    return errInternalServer(next);
  }
};

export const authorizationMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const user = JSON.parse(req.headers.user as string);

    if (user.role !== 1) return errUnauthorized(next);

    return next();
  } catch (err) {
    return errInternalServer(next);
  }
};
