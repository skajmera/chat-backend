import { Response } from "express";

export const successResponse = (
  res: Response,
  statusCode: number,
  data: unknown
): void => {
  res.status(statusCode).json({
    success: true,
    data
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string
): void => {
  res.status(statusCode).json({
    success: false,
    message
  });
};
