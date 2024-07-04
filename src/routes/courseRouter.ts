import express from "express";
import { createCourse, getCourse, getCourses } from "../controllers";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../middleware";

const courseRouter = express.Router();

courseRouter.use(authenticationMiddleware);
courseRouter.use(authorizationMiddleware);
courseRouter.post("/", createCourse);
courseRouter.get("/:id", getCourse);
courseRouter.get("/", getCourses);

export { courseRouter };
