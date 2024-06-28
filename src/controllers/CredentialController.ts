import { Request, Response } from "express";
import { Credential } from "../models";

export const registerAsAdmin = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = await req.body;

    let data = await Credential.create({
      username,
      email,
      password,
      role: 0,
    });

    res.status(200).json({
      data,
    });
  } catch (err: any) {
    console.log(err.errors);

    res.status(500).json({
      msg: "Server error!",
    });
  }
};
