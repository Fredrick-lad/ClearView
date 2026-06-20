import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

export default function generateToken(payload: JwtPayload) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    const accessToken = jwt.sign(payload, secret, { expiresIn: "8h" });
    return accessToken;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate authentication token");
  }
}
