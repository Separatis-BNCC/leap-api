import express from "express";
import {
  createContent,
  deleteContent,
  editContent,
  getContent,
} from "../controllers";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../middleware";

const contentRouter = express.Router();

contentRouter.use(authenticationMiddleware);

contentRouter.use(authorizationMiddleware);
contentRouter.post("/", createContent);
contentRouter.get("/:id", getContent);
contentRouter.put("/:id", editContent);
contentRouter.delete("/:id", deleteContent);

export { contentRouter };
