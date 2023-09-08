import httpStatus from "http-status";
import {ApiError} from "../../../handleErrors/ApiError";
import {Cow} from "../cow/cow.model";
import {IOrder} from "./order.interface";
import mongoose from "mongoose";
import {User} from "../user/user.model";
import {Order} from "./order.model";
import {JwtPayload} from "jsonwebtoken";
import {ICow} from "../cow/cow.interface";

export const createOrderService = async (order: IOrder): Promise<IOrder | null> => {
  const cow = await Cow.findById({_id: order?.cow});
  const buyer = await User.findById({_id: order?.buyer});
  const seller = await User.findById({_id: cow?.seller});
  //checking whether cow and user exist or not
  if (!cow) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This cow doesn't exist");
  }
  if (!buyer) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This buyer doesn't exist");
  }
  if (!seller) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This seller doesn't exist");
  }
  if (cow.price > buyer.budget) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This Buyer doesn't have enough money to buy this cow");
  }
  //

  let newOrderAllData;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    cow.label = "sold out";
    buyer.budget = buyer.budget - cow.price;
    seller.income = seller.income + cow.price;
    await cow.save({session});
    await buyer.save({session});
    await seller.save({session});
    const newOrder = await Order.create([order], {session});
    if (!newOrder.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create order");
    }
    newOrderAllData = newOrder[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newOrderAllData) {
    newOrderAllData = await Order.findOne({_id: newOrderAllData._id}).populate("cow").populate("buyer");
  }

  return newOrderAllData;
};
//get all orders
export const getAllOrdersService = async (user: JwtPayload | null): Promise<IOrder[]> => {
  let orders: IOrder[] = [];
  console.log(user?.role);
  if (user?.role === "admin") {
    orders = await Order.find({})
      .populate({
        path: "cow",
        populate: [
          {
            path: "seller",
          },
        ],
      })
      .populate("buyer");
  } //
  else if (user?.role === "buyer") {
    orders = await Order.find({buyer: user?.userId}).populate("cow").populate("buyer");
  } //
  else if (user?.role === "seller") {
    const sellerCow = (await Cow.findOne({seller: user?.userId}).populate({
      path: "orders",
      populate: [
        {
          path: "cow",
          populate: [{path: "seller"}],
        },
        {
          path: "buyer",
        },
      ],
    })) as ICow & {orders: IOrder[]};
    orders = sellerCow?.orders;
  }

  return orders;
};

export const getSingleOrderService = async (id: string): Promise<IOrder | null> => {
  const order = await Order.findOne({_id: id})
    .populate({
      path: "cow",
      populate: [
        {
          path: "seller",
        },
      ],
    })
    .populate("buyer");
  return order;
};
