import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * Middleware to verify JWT and protect routes.
 */
export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        res.status(401).json({ success: false, message: "Access denied. No token provided." });
        return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ success: false, message: "Access denied. No token provided." });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number; email: string; role: string };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ success: false, message: "Invalid or expired token" });
        return;
    }
};
