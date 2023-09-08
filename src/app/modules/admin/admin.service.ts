import httpStatus from "http-status";
import config from "../../../config";
import {ApiError} from "../../../handleErrors/ApiError";
import {IAdmin} from "./admin.interface";
import {Admin} from "./admin.model";
import {ILoginResponse, ILoginUser} from "../auth/auth.interface";
import {createToken} from "../../../shared/jwtHelpers";
import {Secret} from "jsonwebtoken";

export const createAdminService = async (admin: IAdmin): Promise<Partial<IAdmin> | null> => {
  //set password
  if (!admin.password) {
    admin.password = config.default_admin_pass as string;
  }
  //creating admin
  const newAdmin = (await Admin.create(admin)).toObject();
  if (!newAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create admin!");
  }
  const {password, ...others} = newAdmin;
  return others;
};

//
export const loginAdminService = async (payload: ILoginUser): Promise<ILoginResponse> => {
  const {phoneNumber, password} = payload;
  //creating insatnce method
  const admin = new Admin();
  const isAdminExist = await admin.isAdminExist(phoneNumber);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin doesn't found");
  }

  if (isAdminExist.password && !admin.isPasswordMatched(password, isAdminExist.password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password is incorrect");
  }
  //create accesstoken & refresh token
  const {_id: userId, role} = isAdminExist;
  const accessToken = createToken({userId, role}, config.jwt.secret as Secret, {
    expiresIn: config.jwt.expires_in,
  });

  const refreshToken = createToken({userId, role}, config.jwt.refresh_secret as Secret, {expiresIn: config.jwt.refresh_expires_in});

  return {
    accessToken,
    refreshToken,
  };
};
