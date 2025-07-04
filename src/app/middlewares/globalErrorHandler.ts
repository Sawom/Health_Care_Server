// create a reuseable function for error handleing.
// showing error msg in a json format

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.name || "Something went wrong!",
    error: err,
  });
};

export default globalErrorHandler;
