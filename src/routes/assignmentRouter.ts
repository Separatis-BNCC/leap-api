import express from "express";
import {
  createAssignment,
  getAssignment,
  editAssignment,
  deleteAssignment,
} from "../controllers";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../middleware";

const assignmentRouter = express.Router();

assignmentRouter.use(authenticationMiddleware);

assignmentRouter.use(authorizationMiddleware);
assignmentRouter.post("/", createAssignment);
assignmentRouter.get("/:id", getAssignment);
assignmentRouter.put("/:id", editAssignment);
assignmentRouter.delete("/:id", deleteAssignment);

export { assignmentRouter };
