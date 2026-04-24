import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid Token");
  }
}
