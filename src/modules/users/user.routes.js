import { Router } from "express";
import { profile, update } from "../controllers/user.js";
import { auth } from "../../middlewares/auth.js";

export const userRouter = Router();

userRouter.get("/user", auth, profile);
userRouter.patch("/user", auth, update);
