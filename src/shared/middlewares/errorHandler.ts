import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { ApiError } from "../errors/ApiError";
import jwt from "jsonwebtoken";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);

  switch (true) {
    case err instanceof SyntaxError &&
      (err as any).type === "entity.parse.failed":
      return res.status(422).json({ error: "Empty body" });

    case err instanceof ApiError:
      return res.status(err.status).json({ error: err.message });

    case err instanceof jwt.JsonWebTokenError || jwt.TokenExpiredError:
      return res.status(401).json({ error: err.message });

    case err instanceof ZodError:
      return res.status(400).json({ error: err.flatten().fieldErrors });

    default:
      return res.status(500).json({ error: "Internal server error" });
  }
};
