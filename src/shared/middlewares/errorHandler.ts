import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ApiError } from "../errors/ApiError";

export class errorHandler {
  public static handle(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    console.error(err);

    let status: number;
    let message: string | object;

    if (err instanceof ApiError) {
      status = err.status;
      message = err.message;
    } else if (err instanceof ZodError) {
      status = 422;
      message = err.flatten().fieldErrors;
    } else {
      status = 500;
      message = "Internal server error";
    }

    return res.status(status).json({ error: message });
  }
}
