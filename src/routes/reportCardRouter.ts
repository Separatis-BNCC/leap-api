import express from "express";
import { 
    createReportCard, 
    getReportCard, 
    editReportCard,
    deleteReportCard,
} from "../controllers"
import {
    authenticationMiddleware,
    authorizationMiddleware,
} from "../middleware";

const reportCardRouter = express.Router();
reportCardRouter.use(authenticationMiddleware);
reportCardRouter.post("/", createReportCard);
reportCardRouter.get("/:id", getReportCard);
reportCardRouter.put("/:id", editReportCard);
reportCardRouter.delete("/:id", deleteReportCard);
reportCardRouter.use(authorizationMiddleware);

export {reportCardRouter};

