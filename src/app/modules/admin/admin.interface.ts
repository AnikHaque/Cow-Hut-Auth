import {Model} from "mongoose";
import {Name} from "../user/user.interface";
import {IExistingUser} from "../auth/auth.interface";

export type IAdmin = {
  phoneNumber: string;
  role: "admin";
  password: string;
  name: Name;
  address: string;
};
export type IAdminMethods = {
  isAdminExist(phoneNumber: string): Promise<IExistingUser | null>;
  isAdminExistById(id: string): Promise<IExistingUser | null>;
  isPasswordMatched(givenPass: string, savedPass: string): Promise<boolean>;
};
export type AdminModel = Model<IAdmin, Record<string, unknown>, IAdminMethods>;
