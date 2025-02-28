import { Request, Response, RequestHandler } from "express";
import { Account, accounts } from "../models/accountModel";

// GET ALL ACCOUNTS
export const getAccounts: RequestHandler = (req, res): void => {
  res.json(accounts);
};

// CREATE A NEW ACCOUNT
export const createAccount: RequestHandler = (req, res): void => {
  const { owner } = req.body;
  if (!owner) {
    res.status(400).json({ message: "The owner's name is required" });
    return;
  }

  const newAccount: Account = { id: accounts.length + 1, owner, balance: 0 };
  accounts.push(newAccount);
  res.status(201).json(newAccount);
};

// MAKE A DEPOSIT
export const deposit: RequestHandler = (req, res): void => {
  const { id } = req.params;
  const { amount } = req.body;

  const account = accounts.find((acc) => acc.id === parseInt(id));
  if (!account) {
    res.status(404).json({ message: "Account not found" });
    return;
  }

  if (!amount || amount <= 0) {
    res.status(400).json({ message: "Invalid amount" });
    return;
  }

  account.balance += amount;
  res.json(account);
};

// MAKE A WITHDRAW
export const withdraw: RequestHandler = (req, res): void => {
  const { id } = req.params;
  const { amount } = req.body;

  const account = accounts.find((acc) => acc.id === parseInt(id));
  if (!account) {
    res.status(404).json({ message: "Account not found" });
    return;
  }

  if (!amount || amount <= 0 || amount > account.balance) {
    res.status(400).json({ message: "Invalid or insufficient amount" });
    return;
  }

  account.balance -= amount;
  res.json(account);
};

// MAKE A TRANSFER BETWEEN ACCOUNTS
export const transfer: RequestHandler = (req, res): void => {
  const { fromId, toId } = req.params;
  const { amount } = req.body;

  const fromAccount = accounts.find((acc) => acc.id === parseInt(fromId));
  const toAccount = accounts.find((acc) => acc.id === parseInt(toId));

  if (!fromAccount || !toAccount) {
    res.status(404).json({ message: "One or both accounts do not exist" });
    return;
  }

  if (!amount || amount <= 0 || amount > fromAccount.balance) {
    res.status(400).json({ message: "Invalid or insufficient amount" });
    return;
  }

  fromAccount.balance -= amount;
  toAccount.balance += amount;

  res.json({ fromAccount, toAccount });
};
