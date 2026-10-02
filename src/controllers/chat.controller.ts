import { Request, Response } from "express";
import { createOrGetChat } from "../services/chat.service";

export const createChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userAId, userBId } = req.body;

    if (!userAId || !userBId) {
      res.status(400).json({
        success: false,
        message: "userAId and userBId are required"
      });
      return;
    }

    const chat = await createOrGetChat(userAId, userBId);

    res.status(200).json({
      success: true,
      chatId: chat.id
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to create chat"
    });
  }
};
