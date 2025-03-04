import { Request, Response, RequestHandler } from "express";
import { param } from "express-validator";
import { validateRequest } from "../middlewares/validationMiddleware";
import { getAccountTransactions } from "../services/transactionService";

/**
 * Validation rules for retrieving transactions.
 */
export const getTransactionsValidations = [
    param("accountId").isInt({ min: 1 }).withMessage("Invalid account ID"),
    validateRequest
];

/**
 * Handles retrieving all transactions for a given account.
 */
export const getTransactionsHandler: RequestHandler = async (req, res) => {
    try {
        const accountId = parseInt(req.params.accountId, 10);
        const transactions = await getAccountTransactions(accountId);

        if (!transactions || transactions.length === 0) {
            res.status(404).json({ success: false, error: "No transactions found for this account" });
            return;
        }

        res.json({ success: true, data: transactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};