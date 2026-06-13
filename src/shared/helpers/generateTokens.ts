import type { users } from "@prisma/client";
import jwt from "jsonwebtoken";

export function AccessToken(user: Pick<users, "id" | "role">) {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.ACCESS_SECRET!,
    {
      expiresIn: "15m",
    },
  );
}

export function RefreshToken(user: Pick<users, "id" | "role">) {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.REFRESH_SECRET!,
    {
      expiresIn: "7d",
    },
  );
}
