import express from "express";
import { getUsers } from "../controllers";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../middleware";

const userRouter = express.Router();

userRouter.use(authenticationMiddleware);
userRouter.use(authorizationMiddleware);

userRouter.get("/admin/users", getUsers);

export { userRouter };
