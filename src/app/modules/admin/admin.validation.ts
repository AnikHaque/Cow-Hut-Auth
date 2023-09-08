import {z} from "zod";

export const createAdminZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: "Phone Number is required",
    }),
    role: z.enum(["admin"], {
      required_error: "Role is required",
    }),
    password: z.string().optional(),
    name: z.object({
      firstName: z.string({
        required_error: "First name is required",
      }),
      lastName: z.string({
        required_error: "Last name is required",
      }),
    }),

    address: z.string({
      required_error: "Address is required",
    }),
  }),
});
