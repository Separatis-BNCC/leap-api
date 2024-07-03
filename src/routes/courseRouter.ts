import express from "express";
import { createCourse } from "../controllers";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../middleware";

const courseRouter = express.Router();

courseRouter.use(authenticationMiddleware);
courseRouter.use(authorizationMiddleware);
courseRouter.post("/", createCourse);

export { courseRouter };
