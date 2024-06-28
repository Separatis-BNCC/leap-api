import express, { Request, Response, NextFunction } from "express";
import { logger } from "./utils";

// Config
const PORT = process.env.PORT || 3001;
const app = express();

app.get("/hello-world", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    msg: "Hello World!",
  });
});

app.listen(PORT, () => {
  logger("info", `App running on PORT: ${PORT}`);
  logger("error", "Error MSG");
});
