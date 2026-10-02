export const validateCreateChat = (
  userAId: string,
  userBId: string
): void => {
  if (!userAId || !userBId) {
    throw new Error("userAId and userBId are required");
  }

  if (userAId === userBId) {
    throw new Error("Users must be different");
  }
};
