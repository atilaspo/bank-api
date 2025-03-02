import { Account } from "../models/accountModel";
import { findAllAccounts, findAccountById, createAccount, updateAccount } from "../repositories/accountRepository";

/**
 * Retrieves all accounts.
 */
export const getAllAccounts = async (): Promise<Account[]> => {
    return await findAllAccounts();
};

/**
 * Creates a new account.
 */
export const createNewAccount = async (owner: string): Promise<Account> => {
    return await createAccount(owner);
};

/**
 * Deposits money into an account.
 */
export const depositToAccount = async (accountId: number, amount: number): Promise<Account | string> => {
    const account = await findAccountById(accountId);
    if (!account) return "Account not found";
    if (amount <= 0) return "Amount must be greater than zero";

    account.balance += amount;
    await updateAccount(account);
    return account;
};

/**
 * Withdraws money from an account.
 */
export const withdrawFromAccount = async (accountId: number, amount: number): Promise<Account | string> => {
    const account = await findAccountById(accountId);
    if (!account) return "Account not found";
    if (amount <= 0 || amount > account.balance) return "Invalid or insufficient amount";

    account.balance -= amount;
    await updateAccount(account);
    return account;
};

/**
 * Transfers money between two accounts.
 */
export const transferBetweenAccounts = async (
    fromId: number,
    toId: number,
    amount: number
): Promise<{ fromAccount: Account; toAccount: Account } | string> => {
    const fromAccount = await findAccountById(fromId);
    const toAccount = await findAccountById(toId);

    if (!fromAccount || !toAccount) return "One or both accounts do not exist";
    if (amount <= 0 || amount > fromAccount.balance) return "Invalid or insufficient amount";

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    await updateAccount(fromAccount);
    await updateAccount(toAccount);

    return { fromAccount, toAccount };
};
