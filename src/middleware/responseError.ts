import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const responseError: ErrorRequestHandler = (err, req, res, next) => {
  const { status, msg } = err;

  return res.status(status || 500).json({
    msg: msg || "Internal server error!",
    status: status || 500,
  });
};
