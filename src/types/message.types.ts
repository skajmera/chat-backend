export interface SendMessageRequest {
  senderId: string;
  text: string;
}

export interface MarkMessageReadRequest {
  userId: string;
}

export interface UpdateLastSeenRequest {
  userId: string;
  messageId: string;
}
