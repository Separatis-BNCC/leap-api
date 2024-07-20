import express from "express";
import { editSession, getSession } from "../controllers";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../middleware";

const sessionRouter = express.Router();

sessionRouter.use(authenticationMiddleware);
sessionRouter.get("/:id", getSession);

sessionRouter.use(authorizationMiddleware);
sessionRouter.put("/:id", editSession);

export { sessionRouter };
