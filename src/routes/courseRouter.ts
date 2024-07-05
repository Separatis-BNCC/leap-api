import express from "express";
import {
  changeCourseStatus,
  createCourse,
  deleteCourse,
  editCourse,
  getCourse,
  getCourses,
} from "../controllers";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../middleware";

const courseRouter = express.Router();

courseRouter.use(authenticationMiddleware);
courseRouter.get("/", getCourses);

courseRouter.use(authorizationMiddleware);
courseRouter.post("/", createCourse);
courseRouter.get("/:id", getCourse);
courseRouter.put("/status/:id", changeCourseStatus);
courseRouter.put("/:id", editCourse);
courseRouter.delete("/:id", deleteCourse);

export { courseRouter };
