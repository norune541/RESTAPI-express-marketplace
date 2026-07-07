import { z } from "zod";

const phoneRegex = /^\+?[1-9]\d{6,14}$/;

export const CreateUserSchema = z.object({
  name: z.string().min(2, "Name should be atleast 2 characters"),
  email: z.email("Invalid email format"),
  phone: z.string().regex(phoneRegex, "Invalid phone format"),
  password: z.string().min(8, "Password should be atleast 8 characters"),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
