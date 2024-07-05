import express from "express";
import {
  createClass,
  deleteClass,
  editClass,
  getClassById,
} from "../controllers";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../middleware";

const classRouter = express.Router();

classRouter.use(authenticationMiddleware);
classRouter.get("/:id", getClassById);

classRouter.use(authorizationMiddleware);
classRouter.post("/", createClass);
classRouter.put("/:id", editClass);
classRouter.delete("/:id", deleteClass);

export { classRouter };
