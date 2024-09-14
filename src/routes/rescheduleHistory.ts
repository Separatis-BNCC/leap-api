import express from "express";
import { 
    createRescheduleHistory, 
    getRescheduleHistory, 
    editRescheduleHistory,
    deleteRescheduleHistory,
} from "../controllers"
import {
    authenticationMiddleware,
    authorizationMiddleware,
} from "../middleware";

const rescheduleHistoryRouter = express.Router();
rescheduleHistoryRouter.use(authenticationMiddleware);
rescheduleHistoryRouter.post("/", createRescheduleHistory);
rescheduleHistoryRouter.get("/:id", getRescheduleHistory);
rescheduleHistoryRouter.put("/:id", editRescheduleHistory);
rescheduleHistoryRouter.delete("/:id", deleteRescheduleHistory);
rescheduleHistoryRouter.use(authorizationMiddleware);

export {rescheduleHistoryRouter}
