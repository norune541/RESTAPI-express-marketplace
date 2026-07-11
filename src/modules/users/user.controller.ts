import type { Request, Response } from "express";
import { ApiError } from "../../shared/errors/ApiError";
import { getCurrentUser } from "./user.service";

export const getUser = async (req: Request, res: Response) => {
  const user = await getCurrentUser(req.user.id);
  if (!user) {
    throw new ApiError(`User ${req.params.id} not found`, 404);
  }
  return res.status(200).json(user);
};
