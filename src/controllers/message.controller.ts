import { Request, Response } from "express";
import {
  sendMessage,
  getMessages,
  markMessageAsRead,
  updateLastSeen
} from "../services/message.service";

export const sendMessageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { chatId } = req.params;
    const { senderId, text } = req.body;

    if (!senderId || !text || !text.trim()) {
      res.status(400).json({
        success: false,
        message: "senderId and text are required"
      });
      return;
    }

    const message = await sendMessage(chatId, {
      senderId,
      text: text.trim()
    });

    res.status(201).json({
      success: true,
      message
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to send message"
    });
  }
};

export const getMessagesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { chatId } = req.params;

    const requestedLimit = Number(req.query.limit) || 50;
    const limit = Math.min(Math.max(requestedLimit, 1), 100);

    const messages = await getMessages(chatId, limit);

    res.status(200).json({
      success: true,
      messages
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to get messages"
    });
  }
};

export const markMessageReadController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { chatId, messageId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "userId is required"
      });
      return;
    }

    const result = await markMessageAsRead(
      chatId,
      messageId,
      { userId }
    );

    res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to mark message as read"
    });
  }
};

export const updateLastSeenController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { chatId } = req.params;
    const { userId, messageId } = req.body;

    if (!userId || !messageId) {
      res.status(400).json({
        success: false,
        message: "userId and messageId are required"
      });
      return;
    }

    const result = await updateLastSeen(
      chatId,
      { userId, messageId }
    );

    res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to update last seen"
    });
  }
};
