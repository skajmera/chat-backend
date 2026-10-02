import {
  findUserById,
  findUserChats
} from "../repositories/user.repository";

export const getUserChats = async (userId: string) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return findUserChats(userId);
};
