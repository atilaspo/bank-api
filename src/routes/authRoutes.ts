import express from "express";
import { registerUser, loginUser } from "../services/userService";

const router = express.Router();

/**
 * Registers a new user.
 */
router.post("/register", async (req, res): Promise<void> => {
    try {
        const { email, password, role } = req.body;
        const result = await registerUser(email, password, role);
        
        if (typeof result === "string") {
            res.status(400).json({ success: false, error: result });
            return;
        }

        res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

/**
 * Logs in a user and returns a JWT token.
 */
router.post("/login", async (req, res): Promise<void> => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        
        if (typeof result === "string") {
            res.status(400).json({ success: false, error: result });
            return;
        }

        res.json({ success: true, token: result.token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export default router;