import type { Request, Response } from "express";
import { CreateUserSchema } from "../users/create-user.dto";
import { signup } from "./auth.service";

export const createUser = async (req: Request, res: Response) => {
  const parse = CreateUserSchema.parse(req.body);
  const token = await signup(parse);
  return res.status(201).json({ access_token: token });
};
