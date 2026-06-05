import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { ApiError } from "../errors/ApiError";

export const register = async (req, res, next) => {
  const { name = null, phone, email, password } = req.body;
  const regex = /^\+\d{10,15}$/;

  const validationRules = [
    {
      hasError: !phone || !email,
      message: "Phone and email are required",
    },
    {
      hasError: phone && !regex.test(phone),
      message: "Invalid phone format",
    },
    {
      hasError: email && !email.includes("@"),
      message: "Invalid email format",
    },
    {
      hasError: !password,
      message: "Password is required",
    },
    {
      hasError: password && (password.length < 8 || password.length > 50),
      message: "Password must be between 8 and 50 characters",
    },
  ];

  const error = validationRules.find((err) => err.hasError);
  if (error) {
    return next(ApiError(error.message, 422));
  }

  // Сохранение пользователя
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create(name, phone, email, hash);

  // Обновление токена
  const payload = {
    id: user.insertId,
    role: "user",
  };

  const userToken = jwt.sign(payload, process.env.JWT_SECRET);
  await User.updateTokenById(userToken, user.insertId);

  return res.status(201).json({ access_token: userToken });
};

export const login = async (req, res, next) => {
  const { login, password } = req.body;
  const regex = /^\+\d{10,15}$/;

  const isPhone = regex.test(login);
  const isEmail = login?.includes("@");

  const validationRules = [
    {
      hasError: !login,
      message: "Phone or email are missing",
    },
    {
      hasError: !password,
      message: "Password is missing",
    },
    {
      hasError: !isPhone && !isEmail,
      message: "Invalid phone or email format",
    },
  ];

  const error = validationRules.find((err) => err.hasError);
  if (error) {
    return next(ApiError(error.message, 422));
  }

  const user = await User.findByLogin(login);
  if (!user) {
    return next(ApiError("Invalid credentials", 401));
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return next(ApiError("Invalid credentials", 401));
  }

  const payload = {
    id: user.id,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  await User.updateTokenById(token, user.id);

  return res.status(200).json({ access_token: token });
};

export const logout = async (req, res) => {
  await User.updateTokenById(null, req.user.id);
  return res.sendStatus(204);
};
