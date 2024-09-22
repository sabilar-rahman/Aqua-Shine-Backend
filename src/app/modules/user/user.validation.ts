import { z } from "zod";
import { userRoleEnum } from "./user.constant";

const roleEnum = z.enum(userRoleEnum as [string, ...string[]]);

const userCreateValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    role: roleEnum,
    address: z.string().min(1, { message: "Address is required" }),
    image: z.string().optional(),
  }),
});

const updateUserValidationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  phone: z.string().min(10).optional(),
  image: z.string().optional(),
  role: roleEnum.optional(),
  address: z.string().min(1).optional(),
  isDeleted: z.boolean().optional(),
});

export const UserValidation = {
  userCreateValidationSchema,
  updateUserValidationSchema
};
