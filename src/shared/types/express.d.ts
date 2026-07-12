import type * as _express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        role: string;
      };
    }
  }
}
