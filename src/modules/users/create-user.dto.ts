import { z } from "zod";

const phoneRegex = /^\+?[1-9]\d{6,14}$/;

export const CreateUserSchema = z.object({
  name: z
    .string("Name must be a string")
    .trim()
    .min(2, "Name must be atleast 2 characters"),
  email: z.email("Invalid email format"),
  phone: z
    .string("Phone must be a string")
    .trim()
    .regex(phoneRegex, "Invalid phone format"),
  password: z
    .string("Password must be a string")
    .trim()
    .min(8, "Password must be atleast 8 characters"),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
