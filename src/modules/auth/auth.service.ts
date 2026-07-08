import bcrypt from "bcrypt";
import prisma from "../../shared/config/prisma";
import { ApiError } from "../../shared/errors/ApiError";
import type { CreateUserDto } from "../users/create-user.dto";
import type { LoginDto } from "./login.dto";
import { AccessToken, RefreshToken } from "../../shared/helpers/generateTokens";

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
  if (user) {
    const ok = await bcrypt.compare(userData.password, user.password);
    if (ok) {
      const accessToken = AccessToken(user);
      const refreshToken = RefreshToken(user);

      return {
        accessToken,
        refreshToken,
      };
    }
  }

  throw new ApiError("Invalid credentials", 401);
};
