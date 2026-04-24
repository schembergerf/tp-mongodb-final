 import { JWT_SECRET } from "../config/config.js";
import { verifyToken } from "../utils/verifyToken.js";
import jwt from "jsonwebtoken";

export const verifyTokenMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "Access token is invalid" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid access token", error: error.message });
  }
};

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}
