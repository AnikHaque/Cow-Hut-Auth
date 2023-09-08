import {z} from "zod";
import {Order} from "./order.model";
import {Cow} from "../cow/cow.model";

export const createOrderZodSchema = z.object({
  body: z.object({
    cow: z.string({
      required_error: "Cow is required",
    }),
    buyer: z.string({
      required_error: "Buyer is required",
    }),
  }),
});

export const validateOrder = async (id: string, userId: string): Promise<boolean | undefined> => {
  const order = await Order.findOne({_id: id});
  const cow = await Cow.findOne({_id: order?.cow});

  return cow?.seller.toString() === userId || order?.buyer.toString() === userId;
};
