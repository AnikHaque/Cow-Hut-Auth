import httpStatus from "http-status";
import {catchAsync} from "../../../shared/catchAsync";
import {sendResponse} from "../../../shared/sendResponse";
import {IAdmin} from "./admin.interface";
import {createAdminService, loginAdminService} from "./admin.service";
import {Request, Response} from "express";
import config from "../../../config";
import {ILoginResponse} from "../auth/auth.interface";

export const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const admin = req.body;
  const newAdmin = await createAdminService(admin);

  sendResponse<Partial<IAdmin>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully!",
    data: newAdmin,
  });
});

export const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  //
  const data = req?.body;
  const result = await loginAdminService(data);
  const {refreshToken, ...others} = result;
  //set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);
  sendResponse<ILoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin logged in successfully!",
    data: others,
  });
});
