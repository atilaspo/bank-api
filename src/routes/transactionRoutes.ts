import express, { RequestHandler } from "express";
import { getTransactionsHandler, getTransactionsValidations } from "../controllers/transactionController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/:accountId/transactions", authenticateJWT, getTransactionsValidations as RequestHandler[], getTransactionsHandler);

export default router;
