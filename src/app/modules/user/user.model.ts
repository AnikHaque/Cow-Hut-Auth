import {Schema, model} from "mongoose";
import {IUser, UserModel} from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";
import {IExistingUser} from "../auth/auth.interface";

const UserSchema = new Schema<IUser, UserModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["seller", "buyer"],
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
    budget: {
      type: Number,
      default: 0,
    },
    income: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
//check user existence
UserSchema.methods.isUserExist = async function (phoneNumber: string): Promise<IExistingUser | null> {
  return await User.findOne({phoneNumber}, {_id: 1, password: 1, role: 1, phoneNumber: 1}).lean();
};
//check by id
UserSchema.methods.isUserExistById = async function (id: string): Promise<IExistingUser | null> {
  return await User.findOne({_id: id}, {_id: 1, password: 1, role: 1, phoneNumber: 1}).lean();
};
//check password match
UserSchema.methods.isPasswordMatched = async function (givenPass: string, savedPass: string): Promise<boolean> {
  return await bcrypt.compare(givenPass, savedPass);
};
//hasing password
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.password) {
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  }
  next();
});
//create model
export const User = model<IUser, UserModel>("User", UserSchema);
