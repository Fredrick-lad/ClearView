import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

function TokenAuthenticator(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  // const authHeader = req.headers.authorization;

  // if (!authHeader) {
  //   return res.status(401).json({ message: "Authorization header missing" });
  // }
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    const decoded = jwt.verify(token, secret);

    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "No token" });
  }
}

export default TokenAuthenticator;
