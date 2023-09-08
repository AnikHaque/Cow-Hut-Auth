import {z} from "zod";

export const createUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: "Phone Number is required",
    }),
    role: z.enum(["seller", "buyer"], {
      required_error: "Role is required",
    }),
    name: z.object({
      firstName: z.string({
        required_error: "First name is required",
      }),
      lastName: z.string({
        required_error: "Last name is required",
      }),
    }),
    password: z.string().optional(),
    address: z.string({
      required_error: "Address is required",
    }),

    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});
export const updateUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string().optional(),
    role: z.enum(["seller", "buyer"]).optional(),
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    password: z.string().optional(),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});
