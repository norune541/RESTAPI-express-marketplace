import { Router } from "express";
import { getUser } from "./user.controller";
import { auth } from "../../shared/middlewares/auth";
import { register } from "../auth/auth.controller";

export const userRouter = Router();

userRouter.get("/profile", auth, getUser);
userRouter.post("/", register);
