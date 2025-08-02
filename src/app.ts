// here we put all middleware
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

import fs from "fs";
import path from "path";

// create a uploads folder on root.
// if folder does not exists then create it when server is start to avoid *ENOENT* error
const uploadPath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
} // end

const app: Application = express();
app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "health care server",
  });
});

//*** main module routes ***/
// http://localhost:5000//api/v1/(others)
app.use("/api/v1", router);

app.use(globalErrorHandler);

// api not found handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
