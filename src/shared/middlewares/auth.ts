import jwt from "jsonwebtoken";
import { ApiError } from "../errors/ApiError";
import type { Request, Response, NextFunction } from "express";
import type { Decoded } from "../types/decoded";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new ApiError("No token provided", 401);
    }

    const decoded = jwt.verify(token, process.env.ACCESS_SECRET!) as Decoded;

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err: unknown) {
    throw new ApiError((err as { message: string }).message, 401);
  }
};
