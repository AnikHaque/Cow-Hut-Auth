import mongoose from "mongoose";
import {IGenericErrorMessage, IGenericErrorResponse} from "../interfaces/error";

export const handleDuplicateKeyError = (): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: "",
      message: "Duplicate Field Value Entered",
    },
  ];

  return {
    statusCode: 400,
    message: "Duplicate key Error",
    errorMessages: errors,
  };
};
