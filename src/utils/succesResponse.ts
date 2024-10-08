import { Response } from "express";

export const successRes = (res: Response, data: any) => {
  return res.status(200).json({
    status: 200,
    msg: "Success",
    data,
  });
};
