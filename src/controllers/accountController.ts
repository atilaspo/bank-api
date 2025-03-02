import { Request, Response, RequestHandler } from "express";
import { body, param } from "express-validator";
import { validateRequest } from "../middlewares/validationMiddleware";
import { sanitizeInput } from "../utils/sanitization";
import { 
    getAllAccounts, 
    createNewAccount, 
    depositToAccount, 
    withdrawFromAccount, 
    transferBetweenAccounts 
} from "../services/accountService";

/**
 * Handles retrieving all accounts.
 */
export const getAccounts: RequestHandler = async (req, res) => {
    try {
        const accounts = await getAllAccounts();
        res.json({ success: true, data: accounts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * Validation rules for account creation.
 */
export const createAccountValidations = [
    body("ownerId")
        .isInt({ min: 1 })
        .withMessage("Owner ID must be a valid integer"),
    validateRequest
];

/**
 * Handles account creation.
 */
export const createAccountHandler: RequestHandler = async (req, res) => {
    try {
        const { ownerId } = req.body;

        // Validate and sanitize input
        if (!ownerId || typeof ownerId !== "number") {
            res.status(400).json({ success: false, error: "Invalid owner ID" });
            return
        }

        const newAccount = await createNewAccount(ownerId);
        res.status(201).json({ success: true, data: newAccount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * Validation rules for deposits.
 */
export const depositValidations = [
    param("id").isInt({ min: 1 }).withMessage("Invalid account ID"),
    body("amount").isFloat({ min: 0.01 }).withMessage("Invalid amount"),
    validateRequest
];

/**
 * Handles deposits to an account.
 */
export const depositHandler: RequestHandler = async (req, res) => {
    try {
        const accountId = parseInt(req.params.id, 10);
        const { amount } = req.body;

        const result = await depositToAccount(accountId, amount);
        if (typeof result === "string") {
            res.status(400).json({ success: false, error: result });
            return
        }

        res.json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * Validation rules for withdrawals.
 */
export const withdrawValidations = [
    param("id").isInt({ min: 1 }).withMessage("Invalid account ID"),
    body("amount").isFloat({ min: 0.01 }).withMessage("Invalid amount"),
    validateRequest
];

/**
 * Handles withdrawals from an account.
 */
export const withdrawHandler: RequestHandler = async (req, res) => {
    try {
        const accountId = parseInt(req.params.id, 10);
        const { amount } = req.body;

        const result = await withdrawFromAccount(accountId, amount);
        if (typeof result === "string") {
            res.status(400).json({ success: false, error: result });
            return
        }

        res.json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * Validation rules for transfers.
 */
export const transferValidations = [
    param("fromId").isInt({ min: 1 }).withMessage("Invalid sender account ID"),
    param("toId").isInt({ min: 1 }).withMessage("Invalid recipient account ID"),
    body("amount").isFloat({ min: 0.01 }).withMessage("Invalid amount"),
    validateRequest
];

/**
 * Handles transfers between two accounts.
 */
export const transferHandler: RequestHandler = async (req, res) => {
    try {
        const fromId = parseInt(req.params.fromId, 10);
        const toId = parseInt(req.params.toId, 10);
        const { amount } = req.body;

        const result = await transferBetweenAccounts(fromId, toId, amount);
        if (typeof result === "string") {
            res.status(400).json({ success: false, error: result });
            return
        }

        res.json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
