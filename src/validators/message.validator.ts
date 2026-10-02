export const validateMessage = (
  senderId: string,
  text: string
): void => {
  if (!senderId) {
    throw new Error("senderId is required");
  }

  if (!text || !text.trim()) {
    throw new Error("Message text is required");
  }
};
