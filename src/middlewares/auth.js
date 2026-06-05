import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { ApiError } from "../errors/ApiError.js";

export const auth = async (req, res, next) => {
  try {
    // Валидация токена
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(ApiError("Token not provided", 401));
    }
    const ok = jwt.verify(token, process.env.JWT_SECRET);

    // Поиск токена пользователя
    const user = await User.findToken(token);
    if (user.token !== token) {
      return next(ApiError("Unauthorized", 401));
    }

    // Продолжение flow
    req.user = {
      id: user.id,
      role: user.role,
    };
    next();
  } catch (err) {
    return next(ApiError("Unauthorized", 401));
  }
};
