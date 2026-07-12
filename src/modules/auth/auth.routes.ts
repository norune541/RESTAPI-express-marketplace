import { Router } from "express";
import { register, login, logout, tokenRefresh } from "./auth.controller";
import { auth } from "../../shared/middlewares/auth";

export const authRouter = Router();
// TODO: refactor routes to RESTful method
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/refresh", tokenRefresh);
authRouter.post("/logout", auth, logout);
