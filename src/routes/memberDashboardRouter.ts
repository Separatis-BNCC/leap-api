import express from "express";
import {
  getMemberProfile,
  editMemberProfile,
  getMemberDashboard,
} from "../controllers";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../middleware";

const memberDashboardRouter = express.Router();

memberDashboardRouter.use(authenticationMiddleware);
memberDashboardRouter.get("/profiles", getMemberProfile);
memberDashboardRouter.put("/profiles", editMemberProfile);
memberDashboardRouter.get("/dashboard", getMemberDashboard);

memberDashboardRouter.use(authorizationMiddleware);

export { memberDashboardRouter };
