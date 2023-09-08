import {ErrorRequestHandler, NextFunction, Request, Response} from "express";
import {IGenericErrorMessage} from "../../interfaces/error";
import config from "../../config";
import {ApiError} from "../../handleErrors/ApiError";
import {handleValidationError} from "../../handleErrors/handleValidationError";
import {ZodError} from "zod";
import {handleZodError} from "../../handleErrors/handleZodError";
import {handleDuplicateKeyError} from "../../handleErrors/handleDuplicateKeyError";
import {handleCastError} from "../../handleErrors/handleCastError";

export const globalErrorHandler: ErrorRequestHandler = (error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 400;
  let message = "Something went wrong";
  let errorMessages: IGenericErrorMessage[] = [];

  //decide which response to show according to error

  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } //
  else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateKeyError();
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } //
  else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } //
  else if (error?.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } //
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message ? [{path: "", message: error?.message}] : [];
  } //
  else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message ? [{path: "", message: error?.message}] : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error?.stack : undefined,
  });
};
