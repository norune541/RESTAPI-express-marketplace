import type { Request, Response } from "express";
import { ApiError } from "../../shared/errors/ApiError";
import { toUserResponse } from "./response-user.dto";
import * as userService from "../users/user.service";

export const getUser = async (req: Request, res: Response) => {
  const user = await userService.getCurrentUser(Number(req.params.id));
  if (!user) {
    throw new ApiError(`User ${req.params.id} not found`, 404);
  }
  return res.status(200).json(toUserResponse(user));
};
