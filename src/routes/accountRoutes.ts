import express, { Router, RequestHandler } from "express";
import { 
    getAccounts, 
    createAccountHandler, 
    createAccountValidations,
    depositHandler,
    depositValidations,
    withdrawHandler,
    withdrawValidations,
    transferHandler,
    transferValidations
} from "../controllers/accountController";

const router: Router = express.Router();

// Routes
router.get("/accounts", getAccounts);
router.post("/accounts", createAccountValidations as RequestHandler[], createAccountHandler);
router.put("/accounts/:id/deposit", depositValidations as RequestHandler[], depositHandler);
router.put("/accounts/:id/withdraw", withdrawValidations as RequestHandler[], withdrawHandler);
router.put("/accounts/:fromId/transfer/:toId", transferValidations as RequestHandler[], transferHandler);

export default router;
