import jwt from "jsonwebtoken";
import { ApiError } from "../errors/ApiError";
import type { Request, Response, NextFunction } from "express";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new ApiError("No token provided", 401);
    }

    const decoded = jwt.verify(token, process.env.ACCESS_SECRET!);

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    throw new ApiError(err, 401);
  }
};
