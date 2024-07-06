import express from "express";
import { createProfile, login, register, getRegions, getFaculties, getMajors } from "../controllers";
import { authenticationMiddleware } from "../middleware";

const profileRouter = express.Router();

profileRouter.get("/options/regions", getRegions);
profileRouter.get("/options/regions/:regionId/faculties", getFaculties);
profileRouter.get("/options/regions/:regionId/faculties/:facultyId/majors", getMajors);
profileRouter.use(authenticationMiddleware);

profileRouter.post("/", createProfile);

export { profileRouter };
