import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { logger } from "./utils";
import { registerAsAdmin } from "./controllers/CredentialController";

// Config
const PORT = process.env.PORT || 3001;
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

app.get("hello-world", (req: Request, res: Response) => {
  res.status(200).json({
    msg: "Hello World!!!",
  });
});

app.post("/register/as-admin", registerAsAdmin);

app.listen(PORT, () => {
  logger("info", `App running on port ${PORT}`);
});
