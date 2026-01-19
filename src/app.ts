// here we put all middleware
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import cron from "node-cron";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { AppointmentService } from "./app/modules/Appointment/appointment.service";
import router from "./app/routes";

// this error happens because:
// On frontend, you’re using credentials: "include" → correct.
// On backend, you used app.use(cors()), which sets Access-Control-Allow-Origin: *. That’s not allowed when sending credentials.

// ******solution******
// app.use(cors({
//   origin: "http://localhost:3000", when working in local server
//   credentials: true,
// }));

const app: Application = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL as string,
    credentials: true,
  }),
);
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

cron.schedule("* * * * *", () => {
  try {
    AppointmentService.cancelUnpaidAppointments();
  } catch (err) {
    console.error(err);
  }
});

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
