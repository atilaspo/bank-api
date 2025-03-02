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

// 🚀 No es necesario repetir "/accounts", ya que ya se define en index.ts
router.get("/", getAccounts);
router.post("/", createAccountValidations as RequestHandler[], createAccountHandler);
router.put("/:id/deposit", depositValidations as RequestHandler[], depositHandler);
router.put("/:id/withdraw", withdrawValidations as RequestHandler[], withdrawHandler);
router.put("/:fromId/transfer/:toId", transferValidations as RequestHandler[], transferHandler);

export default router;
