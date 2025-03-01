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
export const getAccounts: RequestHandler = (req, res): void => {
    res.json({ success: true, data: getAllAccounts() });
};

/**
 * Validation rules for account creation.
 */
export const createAccountValidations = [
    body("owner")
        .isString()
        .notEmpty().withMessage("The owner's name is required")
        .matches(/^[a-zA-Z\s]+$/).withMessage("Owner name contains invalid characters") // 🔥 Evita caracteres peligrosos
        .escape(),
    validateRequest
];

/**
 * Handles account creation.
 */
export const createAccountHandler: RequestHandler = (req, res): void => {
    const { owner } = req.body;

    // Sanitize input
    const sanitizedOwner = sanitizeInput(owner);

    if (!sanitizedOwner) {
        res.status(400).json({ success: false, error: "Invalid account owner name" });
        return;
    }

    const newAccount = createNewAccount(sanitizedOwner);
    res.status(201).json({ success: true, data: newAccount });
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
export const depositHandler: RequestHandler = (req, res) => {
    const accountId = parseInt(req.params.id, 10);
    const { amount } = req.body;

    const result = depositToAccount(accountId, amount);
    if (typeof result === "string") {
        res.status(400).json({ success: false, error: result });
        return;
    }

    res.json({ success: true, data: result });
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
export const withdrawHandler: RequestHandler = (req, res) => {
    const accountId = parseInt(req.params.id, 10);
    const { amount } = req.body;

    const result = withdrawFromAccount(accountId, amount);
    if (typeof result === "string") {
        res.status(400).json({ success: false, error: result });
        return;
    }

    res.json({ success: true, data: result });
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
export const transferHandler: RequestHandler = (req, res) => {
    const fromId = parseInt(req.params.fromId, 10);
    const toId = parseInt(req.params.toId, 10);
    const { amount } = req.body;

    const result = transferBetweenAccounts(fromId, toId, amount);
    if (typeof result === "string") {
        res.status(400).json({ success: false, error: result });
        return;
    }

    res.json({ success: true, data: result });
};
