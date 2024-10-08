import express from "express";
import {
  createAttendance,
  getAttendance,
  editAttendance,
  acceptAttendance,
  rejectAttendance,
} from "../controllers";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../middleware";

const attendanceRouter = express.Router();

attendanceRouter.use(authenticationMiddleware);
attendanceRouter.post("/", createAttendance);
attendanceRouter.get("/:id", getAttendance);
attendanceRouter.put("/:id/accept", acceptAttendance);
attendanceRouter.put("/:id/reject", rejectAttendance);
attendanceRouter.put("/:id", editAttendance);

attendanceRouter.use(authorizationMiddleware);

export { attendanceRouter };
