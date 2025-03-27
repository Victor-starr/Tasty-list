import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const isAuth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.auth;

  if (!token) {
    res.status(401).json({ message: "Unauthorized access" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const isGuest = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.auth;

  if (token) {
    res.status(403).json({ message: "Already authenticated" });
    return;
  }

  next();
};

export { isAuth, isGuest };
