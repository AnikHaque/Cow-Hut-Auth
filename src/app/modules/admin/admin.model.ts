import {Schema, model} from "mongoose";
import {AdminModel, IAdmin, IAdminMethods} from "./admin.interface";
import bcrypt from "bcrypt";
import config from "../../../config";
import { IExistingUser } from "../auth/auth.interface";

const AdminSchema = new Schema<IAdmin, Record<string, never>, IAdminMethods>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin"],
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
//check admin existence
AdminSchema.methods.isAdminExist = async function (phoneNumber: string): Promise<IExistingUser | null> {
  return await Admin.findOne({phoneNumber}, {_id: 1, password: 1, role: 1, phoneNumber: 1}).lean();
};
//check by id
AdminSchema.methods.isAdminExistById = async function (id: string): Promise<IExistingUser | null> {
  return await Admin.findOne({_id:id}, {_id: 1, password: 1, role: 1, phoneNumber: 1}).lean();
};
//check password match
AdminSchema.methods.isPasswordMatched = async function (givenPass: string, savedPass: string): Promise<boolean> {
  return await bcrypt.compare(givenPass, savedPass);
};
//hasing password
AdminSchema.pre("save", async function (next) {
  const admin = this;
  admin.password = await bcrypt.hash(admin.password, Number(config.bcrypt_salt_rounds));
  next();
});
//create model
export const Admin = model<IAdmin, AdminModel>("Admin", AdminSchema);
