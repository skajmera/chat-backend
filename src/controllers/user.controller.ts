import { Request, Response } from "express";
import { getUserChats } from "../services/user.service";

export const getUserChatsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    const chats = await getUserChats(userId);

    res.status(200).json({
      success: true,
      chats
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to get user chats"
    });
  }
};
