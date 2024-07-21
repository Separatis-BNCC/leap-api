import express from "express";
import {
  addMembers,
  addPraetorian,
  createClass,
  deleteClass,
  editClass,
  getClassById,
  removeMember,
  removePraetorian,
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

classRouter.post("/:class_id/members", addMembers);
classRouter.delete("/:class_id/members/:id", removeMember);
classRouter.post("/:class_id/praetorian", addPraetorian);
classRouter.delete("/:class_id/praetorian/:id", removePraetorian);

export { classRouter };
