import mongoose from "mongoose";
import {IGenericErrorMessage, IGenericErrorResponse} from "../interfaces/error";

export const handleCastError = (err: mongoose.Error.CastError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: err?.path,
      message: "Invalid Object id",
    },
  ];

  return {
    statusCode: 400,
    message: "Cast Error",
    errorMessages: errors,
  };
};
