import {Model} from "mongoose";
import {IExistingUser} from "../auth/auth.interface";
export type Name = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  phoneNumber: string;
  role: "seller" | "buyer";
  password: string;
  name: Name;
  address: string;
  budget: number;
  income: number;
};
export type IUserMethods = {
  isUserExist(phoneNumber: string): Promise<IExistingUser | null>;
  isUserExistById(id: string): Promise<IExistingUser | null>;
  isPasswordMatched(givenPass: string, savedPass: string): Promise<boolean>;
};
export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
