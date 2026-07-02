import bcrypt from "bcrypt";
import prisma from "../../shared/config/prisma";
import { ApiError } from "../../shared/errors/ApiError";
import type { CreateUserDto } from "../users/create-user.dto";
import type { LoginDto } from "./login.dto";
import { json } from "../../shared/helpers/json";
import { AccessToken, RefreshToken } from "../../shared/helpers/generateTokens";

const checkUserUniqueness = async (phone: string, email: string) => {
  const existingUser = await prisma.users.findFirst({
    where: {
      OR: [{ phone }, { email }],
    },
    select: {
      phone: true,
      email: true,
    },
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new ApiError("This email already exists", 409);
    }
    if (existingUser.phone === phone) {
      throw new ApiError("This phone already exists", 409);
    }
  }
};

export const signup = async (userData: CreateUserDto): Promise<any> => {
  // TODO (low): specify the user type

  await checkUserUniqueness(userData.phone, userData.email);

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await prisma.users.create({
    data: {
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      role: true,
    },
  });

  return user;
};

export const login = async (userData: LoginDto): Promise<any> => {
  // TODO (low): specify the user type

  const user = await prisma.users.findUnique({
    where: {
      email: userData.email,
    },
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      password: true,
    },
  });
  if (user) {
    const ok = await bcrypt.compare(userData.password, user.password);
    if (ok) {
      return {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      };
    }
  }

  throw new ApiError("Invalid credentials", 401);
};
