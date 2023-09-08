import {Types} from "mongoose";
import {ENUM_USER_ROLE} from "../../../enums/user";

export type ILoginUser = {
  phoneNumber: string;
  password: string;
};

export type IExistingUser = {
  _id: Types.ObjectId;
  phoneNumber?: string;
  password: string;
  role: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
