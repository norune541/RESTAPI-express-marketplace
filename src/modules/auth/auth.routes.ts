import { Router } from "express";
import { register, login, logout } from "../controllers/auth.js";
import { auth } from "../../middlewares/auth.js";

export const authRouter = Router();
authRouter.post("/auth/register", register);
authRouter.post("/auth/login", login);
authRouter.post("/auth/logout", auth, logout);
