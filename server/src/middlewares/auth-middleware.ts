import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const AuthUser = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token =
      req.cookies?.token_id_user || req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({
        error: "Unauthorized Access. Please Login First!",
      });
      return;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      error: error instanceof Error ? error.message : "Unauthorized",
    });
    return;
  }
};

export default AuthUser;
