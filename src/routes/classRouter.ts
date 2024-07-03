import express from "express";
import { createClass, editClass } from "../controllers";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../middleware";

const classRouter = express.Router();

classRouter.use(authenticationMiddleware);
classRouter.use(authorizationMiddleware);
classRouter.post("/", createClass);
classRouter.put("/:id", editClass);

export { classRouter };
