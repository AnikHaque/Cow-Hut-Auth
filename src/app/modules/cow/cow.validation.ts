import {z} from "zod";
import {breed, category, label, location} from "./cow.constant";
import {Cow} from "./cow.model";

export const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    age: z.number({
      required_error: "Age is required",
    }),
    price: z.number({
      required_error: "Price is required",
    }),

    location: z.enum([...location] as [string, ...string[]], {
      required_error: "Location is required",
    }),
    breed: z.enum([...breed] as [string, ...string[]], {
      required_error: "Breed is required",
    }),
    weight: z.number({
      required_error: "Weight is required",
    }),
    label: z.enum([...label] as [string, ...string[]], {
      required_error: "Label is required",
    }),
    category: z.enum([...category] as [string, ...string[]], {
      required_error: "Category is required",
    }),

    seller: z.string({
      required_error: "Seller is required",
    }),
  }),
});

export const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...location] as [string, ...string[]]).optional(),
    breed: z.enum([...breed] as [string, ...string[]]).optional(),
    weight: z.number().optional(),
    label: z.enum([...label] as [string, ...string[]]).optional(),
    category: z.enum([...category] as [string, ...string[]]).optional(),
    seller: z.string().optional(),
  }),
});

export const validateCowSeller = async (id: string, userId: string): Promise<boolean> => {
  const cow = await Cow.findOne({_id: id});
  return cow?.seller.toString() === userId;
};
