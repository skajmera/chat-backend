import {
  createChat,
  findChatBetweenUsers,
  findChatById
} from "../repositories/chat.repository";
import { findUserById } from "../repositories/user.repository";

export const createOrGetChat = async (
  userAId: string,
  userBId: string
) => {
  if (userAId === userBId) {
    throw new Error("A user cannot create a chat with themselves");
  }

  const userA = await findUserById(userAId);
  const userB = await findUserById(userBId);

  if (!userA || !userB) {
    throw new Error("One or both users do not exist");
  }

  const existingChat = await findChatBetweenUsers(
    userAId,
    userBId
  );

  if (existingChat) {
    return existingChat;
  }

  return createChat(userAId, userBId);
};

export const getChat = async (chatId: string) => {
  const chat = await findChatById(chatId);

  if (!chat) {
    throw new Error("Chat not found");
  }

  return chat;
};
