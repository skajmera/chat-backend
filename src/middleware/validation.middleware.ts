import {
  Request,
  Response,
  NextFunction
} from "express";

export const validateBody = (fields: string[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    for (const field of fields) {
      if (
        req.body[field] === undefined ||
        req.body[field] === null ||
        req.body[field] === ""
      ) {
        res.status(400).json({
          success: false,
          message: `${field} is required`
        });
        return;
      }
    }

    next();
  };
};
