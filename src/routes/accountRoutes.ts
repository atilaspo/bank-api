import express, { Router } from "express";
import { getAccounts, createAccount, deposit, withdraw, transfer } from "../controllers/accountController";

const router: Router = express.Router();

router.get("/accounts", getAccounts);
router.post("/accounts", createAccount);
router.put("/accounts/:id/deposit", deposit);
router.put("/accounts/:id/withdraw", withdraw);
router.put("/accounts/:fromId/transfer/:toId", transfer);

export default router;
