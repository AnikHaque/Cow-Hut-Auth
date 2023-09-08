import {Request, Response} from "express";
import {catchAsync} from "../../../shared/catchAsync";
import {sendResponse} from "../../../shared/sendResponse";
import httpStatus from "http-status";
import {IUser} from "../user/user.interface";
import {deleteUserService, getAllUsersService, getMyProfileService, getSingleUserService, updateMyProfileService, updateUserService} from "./user.service";
//get all users
export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await getAllUsersService();
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully!",
    data: users,
  });
});
//get a single user
export const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await getSingleUserService(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully!",
    data: user,
  });
});
//update user
export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req?.body;
  const updatedUser = await updateUserService(id, updatedData);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully!",
    data: updatedUser,
  });
});
//delete user
export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await deleteUserService(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully!",
    data: user,
  });
});

//get users profile
export const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = await getMyProfileService(req?.user);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrieved successfully!",
    data: user,
  });
});

//update my profile
export const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const updatedData = req?.body;
  const updatedUser = await updateMyProfileService(req?.user, updatedData);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information updated successfully!",
    data: updatedUser,
  });
});
