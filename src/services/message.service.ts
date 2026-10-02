import { firestore } from "../config/firebase";
import {
  SendMessageRequest,
  MarkMessageReadRequest,
  UpdateLastSeenRequest
} from "../types/message.types";

const messagesCollection = (chatId: string) => {
  return firestore
    .collection("chats")
    .doc(chatId)
    .collection("messages");
};

export const sendMessage = async (
  chatId: string,
  data: SendMessageRequest
) => {
  const messageRef = messagesCollection(chatId).doc();

  const message = {
    messageId: messageRef.id,
    senderId: data.senderId,
    text: data.text,
    timestamp: new Date()
  };

  await messageRef.set(message);

  return message;
};

export const getMessages = async (
  chatId: string,
  limit: number
) => {
  const snapshot = await messagesCollection(chatId)
    .orderBy("timestamp", "asc")
    .limit(limit)
    .get();

  const messages: object[] = [];

  snapshot.forEach((doc) => {
    messages.push(doc.data());
  });

  return messages;
};

export const markMessageAsRead = async (
  chatId: string,
  messageId: string,
  data: MarkMessageReadRequest
) => {
  const messageRef = messagesCollection(chatId).doc(messageId);
  const messageSnapshot = await messageRef.get();

  if (!messageSnapshot.exists) {
    throw new Error("Message not found");
  }

  await messageRef.set(
    {
      readBy: {
        [data.userId]: new Date()
      }
    },
    { merge: true }
  );

  return {
    messageId,
    userId: data.userId,
    read: true
  };
};

export const updateLastSeen = async (
  chatId: string,
  data: UpdateLastSeenRequest
) => {
  const userStateRef = firestore
    .collection("chats")
    .doc(chatId)
    .collection("userState")
    .doc(data.userId);

  await userStateRef.set(
    {
      userId: data.userId,
      lastSeenMessageId: data.messageId,
      updatedAt: new Date()
    },
    { merge: true }
  );

  return {
    userId: data.userId,
    lastSeenMessageId: data.messageId
  };
};
