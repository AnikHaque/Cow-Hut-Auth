import cors from "cors";
import express, {Application, NextFunction, Request, Response} from "express";
import httpStatus from "http-status";
import router from "./app/routes";
import {globalErrorHandler} from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";

const app: Application = express();

//
app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//use route
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Server is Listening..");
});
//global error handle
app.use(globalErrorHandler);
//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not found",
    errorMessgaes: [{path: req.originalUrl, message: "Api not found"}],
  });
  next();
});
export default app;
