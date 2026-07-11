import bcrypt from "bcrypt";
import prisma from "../../shared/config/prisma";
import jwt from "jsonwebtoken";
import { ApiError } from "../../shared/errors/ApiError";
import type { CreateUserDto } from "../users/create-user.dto";
import type { LoginDto } from "./login.dto";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../shared/helpers/generateTokens";

const checkUserUniqueness = async (
  phone: string,
  email: string,
): Promise<void> => {
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
    throw new ApiError("This user already exists", 409);
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

export const signin = async (userData: LoginDto): Promise<any> => {
  // TODO (low): specify the user type

  const user = await prisma.users.findFirst({
    where: {
      OR: [{ phone: userData.phone }, { email: userData.email }],
    },
    select: {
      id: true,
      role: true,
      password: true,
    },
  });

  const comparePassword = user ? user.password : process.env.DUMMY_HASH;
  const ok = await bcrypt.compare(userData.password, comparePassword!);

  if (!user || !ok) throw new ApiError("Invalid credentials", 401);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
};

export const refresh = (token: string) => {
  const ok = jwt.verify(token, process.env.REFRESH_SECRET!);

  if (!ok) {
    throw new ApiError("Invalid token", 401);
  }

  const payload = {
    id: ok.id,
    role: ok.role,
  };

  const newAccess = generateAccessToken(payload);
  const newRefresh = generateRefreshToken(payload);

  return {
    newAccess,
    newRefresh,
  };
};
