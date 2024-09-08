import express from "express";
import {
  getMemberProfile,
} from "../controllers";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../middleware";

const memberDashboardRouter = express.Router();

memberDashboardRouter.use(authenticationMiddleware);
memberDashboardRouter.get("/profiles", getMemberProfile);

memberDashboardRouter.use(authorizationMiddleware);

export { memberDashboardRouter };