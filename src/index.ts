import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import { logger } from "./utils";
import { authRouter } from "./routes";
import { responseError } from "./middleware";

// Config
const PORT = process.env.PORT || 3001;
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use(authRouter);

// Global error handler
app.use(responseError);

app.listen(PORT, () => {
  logger("info", `App running on port ${PORT}`);
});
