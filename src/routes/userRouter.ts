import express from "express";
import {
  changeUserActiveStatus,
  changeUserRole,
  getUser,
  getUsers,
} from "../controllers";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../middleware";

const userRouter = express.Router();

userRouter.use(authenticationMiddleware);
userRouter.use(authorizationMiddleware);

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);

// Bulk operations
userRouter.put("/bulk/role", changeUserRole);
userRouter.put("/bulk/active", changeUserActiveStatus);

export { userRouter };
