import {Schema, model} from "mongoose";
import {IOrder, OrderModel} from "./order.interface";

const OrderSchema = new Schema<IOrder, OrderModel>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Cow",
    },
    buyer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

//create model
export const Order = model<IOrder, OrderModel>("Order", OrderSchema);
