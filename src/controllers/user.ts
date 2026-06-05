import { ApiError } from "../errors/ApiError";
import { User } from "../models/user";

export const profile = async (req, res) => {
  const user = await User.findById(req.user.id);
  return res.status(200).json(user);
};

export const update = async (req, res, next) => {
  // Валидация данных
  const { ...payload } = req.body;
  const regex = /^\+\d{10,15}$/;

  const isPhone = regex.test(payload?.phone);
  const isEmail = payload.email?.includes("@");

  const validationRules = [
    {
      hasError: !payload || (!payload.name && !payload.phone && !payload.email),
      message: "Payload missing",
    },
    {
      hasError: payload?.phone && !isPhone,
      message: "Invalid phone format",
    },
    {
      hasError: payload?.email && !isEmail,
      message: "Invalid email format",
    },
    {
      hasError: payload?.name && payload.name.length > 100,
      message: "Name's length must be shorter than 100",
    },
  ];

  const error = validationRules.find((err) => err.hasError);
  if (error) {
    return next(ApiError(error.message, 422));
  }

  // Обновление пользователя
  await User.updateUserById(payload, req.user.id);
  const user = await User.findById(req.user.id);

  return res.status(200).json(user);
};
