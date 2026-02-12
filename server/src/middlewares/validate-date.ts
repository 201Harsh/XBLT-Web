import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const ValidateData = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
      return;
    }

    next();
    return;
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });

    return;
  }
};

export default ValidateData;
