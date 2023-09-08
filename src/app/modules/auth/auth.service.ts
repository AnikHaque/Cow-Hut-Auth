import httpStatus from "http-status";
import config from "../../../config/index";
import {IUser} from "../user/user.interface";
import {User} from "../user/user.model";
import {ApiError} from "../../../handleErrors/ApiError";
import {ILoginResponse, ILoginUser, IRefreshTokenResponse} from "./auth.interface";
import {createToken, verifyToken} from "../../../shared/jwtHelpers";
import {Secret} from "jsonwebtoken";
import {Admin} from "../admin/admin.model";

export const createUserService = async (user: IUser): Promise<Partial<IUser> | null> => {
  //set password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  //check whether budget is provided for buyer role
  if (user.role === "buyer" && !user.budget) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Please put your budget");
  }

  //creating user
  const newUser = (await User.create(user)).toObject();
  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user!");
  }
  const {password, ...others} = newUser;
  return others;
};

//
export const loginUserService = async (payload: ILoginUser): Promise<ILoginResponse> => {
  const {phoneNumber, password} = payload;
  //creating insatnce method
  const user = new User();
  const isUserExist = await user.isUserExist(phoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't found");
  }

  if (isUserExist.password && !user.isPasswordMatched(password, isUserExist.password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password is incorrect");
  }
  //create accesstoken & refresh token
  const {_id: userId, role} = isUserExist;
  const accessToken = createToken({userId, role}, config.jwt.secret as Secret, {
    expiresIn: config.jwt.expires_in,
  });

  const refreshToken = createToken({userId, role}, config.jwt.refresh_secret as Secret, {expiresIn: config.jwt.refresh_expires_in});

  return {
    accessToken,
    refreshToken,
  };
};
///
export const refreshTokenService = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  let newAccessToken;
  try {
    verifiedToken = verifyToken(token, config.jwt.refresh_secret as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token");
  }
  const {userId, role} = verifiedToken;
  if (role === "admin") {
    const admin = new Admin();
    const isAdminExist = await admin.isAdminExistById(userId);
    if (!isAdminExist) {
      throw new ApiError(httpStatus.NOT_FOUND, "Admin doesn't found");
    }
    newAccessToken = createToken({userId: isAdminExist._id, role: isAdminExist.role, phoneNumber: isAdminExist.phoneNumber}, config.jwt.secret as Secret, {expiresIn: config.jwt.expires_in});
  } //
  else {
    const user = new User();
    const isUserExist = await user.isUserExistById(userId);
    if (!isUserExist) {
      throw new ApiError(httpStatus.NOT_FOUND, "user doesn't found");
    }
    newAccessToken = createToken({userId: isUserExist._id, role: isUserExist.role, phoneNumber: isUserExist.phoneNumber}, config.jwt.secret as Secret, {expiresIn: config.jwt.expires_in});
  }

  return {
    accessToken: newAccessToken,
  };
};
