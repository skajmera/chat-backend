import { prisma } from "../config/database";

export const findUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId }
  });
};

export const findUserChats = async (userId: string) => {
  return prisma.chat.findMany({
    where: {
      members: {
        some: { userId }
      }
    },
    include: {
      members: {
        select: {
          userId: true
        }
      }
    },
    orderBy: {
      updatedAt: "desc"
    }
  });
};
