import type { Request, Response } from "express";
import { CreateUserSchema } from "../users/create-user.dto";
import { signup, signin, refresh } from "./auth.service";
import { LoginSchema } from "./login.dto";
import { ApiError } from "../../shared/errors/ApiError";

export const register = async (req: Request, res: Response) => {
  const parse = CreateUserSchema.parse(req.body);
  const user = await signup(parse);
  return res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const parse = LoginSchema.parse(req.body);
  const { accessToken, refreshToken } = await signin(parse);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, // true in production
    sameSite: "strict",
  });

  return res.status(200).json({ accessToken });
};

export const tokenRefresh = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  console.log(token);
  if (!token) {
    throw new ApiError("No token provided", 401);
  }

  const { newAccess, newRefresh } = refresh(token);

  res.cookie("refreshToken", newRefresh, {
    httpOnly: true,
    secure: false, // true in production
    sameSite: "strict",
  });

  return res.status(200).json({ accessToken: newAccess });
};
