import { prisma } from "../config/database";

export const findChatBetweenUsers = async (
  userAId: string,
  userBId: string
) => {
  const chat = await prisma.chat.findFirst({
    where: {
      members: {
        every: {
          userId: { in: [userAId, userBId] }
        }
      }
    },
    include: {
      members: {
        select: {
          userId: true
        }
      }
    }
  });

  if (!chat || chat.members.length !== 2) {
    return null;
  }

  const memberIds = chat.members.map((member) => member.userId);

  if (!memberIds.includes(userAId) || !memberIds.includes(userBId)) {
    return null;
  }

  return chat;
};

export const createChat = async (
  userAId: string,
  userBId: string
) => {
  return prisma.chat.create({
    data: {
      members: {
        create: [
          { userId: userAId },
          { userId: userBId }
        ]
      }
    },
    include: {
      members: {
        select: {
          userId: true
        }
      }
    }
  });
};

export const findChatById = async (chatId: string) => {
  return prisma.chat.findUnique({
    where: { id: chatId },
    include: {
      members: {
        select: {
          userId: true
        }
      }
    }
  });
};
