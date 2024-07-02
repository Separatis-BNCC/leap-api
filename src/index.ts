import express from "express";
import { configDotenv } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import { logger, successRes } from "./utils";
import { authRouter, profileRouter, userRouter } from "./routes";
import { responseError } from "./middleware";

// Config
const PORT = process.env.PORT || 3001;
configDotenv();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  return successRes(res, "Welcome to BNCC Leap!");
});

app.use("/users", userRouter);
app.use("/profiles", profileRouter);
app.use("/", authRouter);

// Global error handler
app.use(responseError);

app.listen(PORT, () => {
  logger("info", `App running on port ${PORT}`);
});
