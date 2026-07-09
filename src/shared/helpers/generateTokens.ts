import jwt from "jsonwebtoken";
import type { users } from "@prisma/client";

export function generateAccessToken(user: Pick<users, "id" | "role">) {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.ACCESS_SECRET!,
    {
      expiresIn: "15m",
    },
  );
}

export function generateRefreshToken(user: Pick<users, "id" | "role">) {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.REFRESH_SECRET!,
    {
      expiresIn: "7d",
    },
  );
}
