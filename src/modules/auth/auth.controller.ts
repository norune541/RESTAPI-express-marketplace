import type { Request, Response } from "express";
import { CreateUserSchema } from "../users/create-user.dto";
import { signup } from "./auth.service";
import { LoginSchema } from "./login.dto";
import { signin } from "./auth.service";
import { json } from "../../shared/helpers/json";

export const register = async (req: Request, res: Response) => {
  const parse = CreateUserSchema.parse(req.body);
  const user = await signup(parse);
  return res.status(201).send(json(user));
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
