import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma";
import { ApiError } from "../../errors/ApiError";
import type { CreateUserDto } from "../users/create-user.dto";
import { json } from "../../helpers/json";

const isExists = async (email: string, phone: string) => {
  const existByEmail = await prisma.users.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  const existByPhone = await prisma.users.findUnique({
    where: {
      phone,
    },
    select: {
      id: true,
    },
  });

  if (existByEmail) {
    throw new ApiError("This email already exists", 409);
  }

  if (existByPhone) {
    throw new ApiError("This phone already exists", 409);
  }
};

export const signup = async (userData: CreateUserDto): Promise<string> => {
  await isExists(userData.email, userData.phone);

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await prisma.users.create({
    data: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: hashedPassword,
    },
    select: {
      id: true,
      role: true,
    },
  });

  const payload = {
    id: json(user.id),
    role: user.role,
  };
  console.log(payload);

  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1hr",
  });

  return token;
};
