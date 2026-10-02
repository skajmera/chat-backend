import dotenv from "dotenv";

dotenv.config();

const requiredEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not defined in environment variables`);
  }

  return value;
};

export const env = {
  port: Number(process.env.PORT) || 5000,
  databaseUrl: requiredEnv("DATABASE_URL"),
  firebaseProjectId: requiredEnv("FIREBASE_PROJECT_ID"),
  firebaseClientEmail: requiredEnv("FIREBASE_CLIENT_EMAIL"),
  firebasePrivateKey: requiredEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n")
};
