import { Request, Response, RequestHandler } from "express";
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
    res.json(getAllAccounts());
};

/**
 * Handles account creation.
 */
export const createAccount: RequestHandler = (req, res): void => {
    const { owner } = req.body;
    if (!owner) {
        res.status(400).json({ message: "The owner's name is required" });
        return;
    }

    const newAccount = createNewAccount(owner);
    res.status(201).json(newAccount);
};

/**
 * Handles deposits to an account.
 */
export const deposit: RequestHandler = (req, res): void => {
    const accountId = parseInt(req.params.id, 10);
    const { amount } = req.body;

    const result = depositToAccount(accountId, amount);
    if (typeof result === "string") {
        res.status(400).json({ message: result });
        return;
    }

    res.json(result);
};

/**
 * Handles withdrawals from an account.
 */
export const withdraw: RequestHandler = (req, res): void => {
    const accountId = parseInt(req.params.id, 10);
    const { amount } = req.body;

    const result = withdrawFromAccount(accountId, amount);
    if (typeof result === "string") {
        res.status(400).json({ message: result });
        return;
    }

    res.json(result);
};

/**
 * Handles transfers between two accounts.
 */
export const transfer: RequestHandler = (req, res): void => {
    const fromId = parseInt(req.params.fromId, 10);
    const toId = parseInt(req.params.toId, 10);
    const { amount } = req.body;

    const result = transferBetweenAccounts(fromId, toId, amount);
    if (typeof result === "string") {
        res.status(400).json({ message: result });
        return;
    }

    res.json(result);
};
