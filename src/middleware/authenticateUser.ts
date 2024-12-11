import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from '../middleware/authMiddleware'

export const checkAdmin:any = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized. No user information provided." })
    }

    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Forbidden. Admin access required." })
    }
    
    next()
  } catch (error) {
    res.status(500).json({ error: "An error occurred while checking admin access." })
  }
};
