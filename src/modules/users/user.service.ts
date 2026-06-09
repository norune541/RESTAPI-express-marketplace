import prisma from "../../config/prisma";

export const getCurrentUser = async (id: number) => {
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  });
  return user;
};
