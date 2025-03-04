import express, { RequestHandler } from "express";
import { getTransactionsHandler, getTransactionsValidations } from "../controllers/transactionController";

const router = express.Router();

// Get all transactions for an account
router.get("/:accountId/transactions", getTransactionsValidations as RequestHandler[], getTransactionsHandler);

export default router;
