import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserAttributes } from "../models/User";
export interface AuthenticatedRequest extends Request {
  user: Omit<UserAttributes, 'password' >
}

export const authenticateUser:any = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      name: string;
      isAdmin: boolean;
    }
    req.user = decoded
    next()
  } catch (err) {
    res.status(400).json({ error: "Invalid token." })
  }
}
