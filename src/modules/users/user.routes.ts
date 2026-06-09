import { Router } from "express";
import * as controller from "./user.controller";

export const userRouter = Router();

userRouter.get("/:id", controller.getUser);
