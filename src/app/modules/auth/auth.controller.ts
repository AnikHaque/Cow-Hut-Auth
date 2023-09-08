import {NextFunction, Request, Response} from "express";
import {createUserService, loginUserService, refreshTokenService} from "./auth.service";
import {catchAsync} from "../../../shared/catchAsync";
import {sendResponse} from "../../../shared/sendResponse";
import httpStatus from "http-status";
import {IUser} from "../user/user.interface";
import config from "../../../config";
import {ILoginResponse, IRefreshTokenResponse} from "./auth.interface";

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const newUser = await createUserService(user);
  sendResponse<Partial<IUser>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully!",
    data: newUser,
  });
});

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  //
  const data = req?.body;
  const result = await loginUserService(data);
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
    message: "User logged in successfully!",
    data: others,
  });
});

export const refreshToken = catchAsync(async (req: Request, res: Response) => {
  //

  const {refreshToken} = req.cookies;
  const result = await refreshTokenService(refreshToken);
  //set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refresh token generated successfully!",
    data: result,
  });
});
