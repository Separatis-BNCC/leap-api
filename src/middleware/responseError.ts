import { NextFunction, Request, Response } from "express";

export const responseError = (
  err: { status: number; msg: string | string[] },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status, msg } = err;

  return res.status(status || 500).json({
    msg: msg || "Internal server error!",
    status: status || 500,
  });
};
