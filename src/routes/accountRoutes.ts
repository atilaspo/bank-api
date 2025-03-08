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
import { authenticateJWT } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.get("/", authenticateJWT, getAccounts);
router.post("/", authenticateJWT, createAccountValidations as RequestHandler[], createAccountHandler);
router.put("/:id/deposit", authenticateJWT, depositValidations as RequestHandler[], depositHandler);
router.put("/:id/withdraw", authenticateJWT, withdrawValidations as RequestHandler[], withdrawHandler);
router.put("/:fromId/transfer/:toId", authenticateJWT, transferValidations as RequestHandler[], transferHandler);

export default router;
