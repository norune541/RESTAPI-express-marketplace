import { z } from "zod";

export const LoginSchema = z.object({
  phone: z.optional(z.e164("Invalid phone format")),
  email: z.optional(z.email("Invalid email format")),
  password: z
    .string("Password should be a string")
    .min(8, "Password should be at least 8 characters"),
});

export type LoginDto = z.infer<typeof LoginSchema>;
