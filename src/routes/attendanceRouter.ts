import express from "express";
import {
  createAttendance,
  getAttendance,
  editAttendance,
} from "../controllers";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../middleware";

const attendanceRouter = express.Router();

attendanceRouter.use(authenticationMiddleware);
attendanceRouter.post("/", createAttendance);
attendanceRouter.get("/:id", getAttendance);
attendanceRouter.put("/:id", editAttendance); // seharusnya ada Praeto middleware

attendanceRouter.use(authorizationMiddleware);

export { attendanceRouter };
