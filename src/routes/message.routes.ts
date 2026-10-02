import { Router } from "express";
import {
  sendMessageController,
  getMessagesController,
  markMessageReadController,
  updateLastSeenController
} from "../controllers/message.controller";

const router = Router();

router.post("/:chatId/message/send", sendMessageController);
router.get("/:chatId/messages", getMessagesController);
router.post(
  "/:chatId/message/:messageId/read",
  markMessageReadController
);
router.post("/:chatId/lastseen", updateLastSeenController);

export default router;
