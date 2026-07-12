import { Router } from "express";
import { login, logout, tokenRefresh } from "./auth.controller";
import { auth } from "../../shared/middlewares/auth";

export const authRouter = Router();

authRouter.post("/tokens", login);
authRouter.post("/tokens/refresh", tokenRefresh);
authRouter.delete("/tokens/current", auth, logout);
