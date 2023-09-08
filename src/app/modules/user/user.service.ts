import httpStatus from "http-status";
import {ApiError} from "../../../handleErrors/ApiError";
import {IUser} from "./user.interface";
import {User} from "./user.model";
import {JwtPayload} from "jsonwebtoken";

//get all users
export const getAllUsersService = async (): Promise<IUser[]> => {
  const users = await User.find({});
  return users;
};

//get a single user
export const getSingleUserService = async (id: string): Promise<IUser | null> => {
  const user = await User.findById({_id: id});
  return user;
};

//update user
export const updateUserService = async (id: string, payload: Partial<IUser>): Promise<IUser | null> => {
  const isExist = await User.findById({_id: id});
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found!");
  }
  const {name, ...userData} = payload;
  const updatedUserData: Partial<IUser> = {...userData};
  //dynamically handle name field
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}`;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await User.findOneAndUpdate({_id: id}, updatedUserData, {
    new: true,
  });
  return result;
};

//delete user
export const deleteUserService = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};
export const getMyProfileService = async (user: JwtPayload | null): Promise<IUser | null> => {
  const information = await User.findOne({_id: user?.userId}, {phoneNumber: 1, name: 1, address: 1});

  return information;
};
export const updateMyProfileService = async (user: JwtPayload | null, payload: Partial<IUser>): Promise<IUser | null> => {
  const isExist = await User.findById({_id: user?.userId});
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found!");
  }
  const {name, ...userData} = payload;
  const updatedUserData: Partial<IUser> = {...userData};
  //updating user
  Object.keys(updatedUserData).forEach((key) => {
    const keyValue = key as keyof typeof updatedUserData;
    (isExist as any)[key] = updatedUserData[keyValue];
  });
  //dynamically handle name field
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      (isExist as any).name[key] = name[key as keyof typeof name];
    });
  }
  await isExist.save();
  const result = await User.findOne({_id: user?.userId});

  return result;
};
