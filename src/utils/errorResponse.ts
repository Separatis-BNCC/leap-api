import { NextFunction } from "express";

export const errBadRequest = (next: NextFunction, msg: string | string[]) => {
  return next({
    status: 400,
    msg,
  });
};

export const errNotFound = (next: NextFunction, msg: string) => {
  return next({
    status: 404,
    msg,
  });
};

export const errUnauthenticated = (next: NextFunction) => {
  return next({
    status: 401,
    msg: "Please login first!",
  });
};

export const errUnauthorized = (next: NextFunction) => {
  return next({
    status: 403,
    msg: "Access denied!",
  });
};

export const errInternalServer = (next: NextFunction) => {
  return next({
    status: 500,
    msg: "Internal server error!",
  });
};
