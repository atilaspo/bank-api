import { Request, Response, RequestHandler } from "express";
import { body, param } from "express-validator";
import { validateRequest } from "../middlewares/validationMiddleware";
import { registerUser, getUserById } from "../services/userService";

/**
 * Validation rules for user registration.
 */
export const userRegistrationValidations = [
    body("email")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("role")
        .isIn(["user", "admin"]).withMessage("Role must be 'user' or 'admin'"),
    validateRequest
];

/**
 * Handles user registration.
 */
export const registerUserHandler: RequestHandler = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const result = await registerUser(email, password, role);
        if (typeof result === "string") {
            res.status(400).json({ success: false, error: result });
            return;
        }

        res.status(201).json({ success: true, data: { id: result.id, email: result.email, role: result.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * Validation rules for getting a user by ID.
 */
export const getUserValidations = [
    param("id").isInt({ min: 1 }).withMessage("Invalid user ID"),
    validateRequest
];

/**
 * Handles retrieving a user by ID.
 */
export const getUserHandler: RequestHandler = async (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const user = await getUserById(userId);

        if (!user) {
            res.status(404).json({ success: false, error: "User not found" });
            return;
        }

        res.json({ success: true, data: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
