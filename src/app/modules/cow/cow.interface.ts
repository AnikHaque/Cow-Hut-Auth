import {Model, Types} from "mongoose";
import {IUser} from "../user/user.interface";
import {IOrder} from "../order/order.interface";
//
export type Location = "Dhaka" | "Chattogram" | "Barishal" | "Rajshahi" | "Sylhet" | "Comilla" | "Rangpur" | "Mymensingh";
//
export type Breed = "Brahman" | "Nellore" | "Sahiwal" | "Gir" | "Indigenous" | "Tharparkar" | "Kankrej";
//
export type Label = "for sale" | "sold out";
//
export type Category = "Dairy" | "Beef" | "Dual Purpose";
//
export type ICow = {
  name: string;
  age: number;
  price: number;
  location: Location;
  breed: Breed;
  weight: number;
  label: Label;
  category: Category;
  seller: Types.ObjectId | IUser;
};
export type ICowFilters = {
  searchTerm?: string;
  location?: string;
};

export type CowModel = Model<ICow, Record<string, unknown>>;
