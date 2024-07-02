import express from "express";
import { createProfile, login, register } from "../controllers";
import { authenticationMiddleware } from "../middleware";

const profileRouter = express.Router();

profileRouter.use(authenticationMiddleware);

profileRouter.post("/", createProfile);

export { profileRouter };
