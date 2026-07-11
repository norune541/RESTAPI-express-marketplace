import { Router } from "express";
import { getUser } from "./user.controller";
import { auth } from "../../shared/middlewares/auth";

export const userRouter = Router();

userRouter.get("/profile", auth, getUser);
