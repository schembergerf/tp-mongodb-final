import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

// Junto con el secreto valida si el token que nos brinda el cliente es correcto
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid Token");
  }
}
