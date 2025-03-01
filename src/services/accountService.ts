import { Account, accounts } from "../models/accountModel";

/**
 * Retrieves all accounts.
 * @returns List of accounts
 */
export const getAllAccounts = (): Account[] => {
    return accounts;
};

/**
 * Creates a new account with an initial balance of 0.
 * @param owner - The account owner's name
 * @returns The created account
 */
export const createNewAccount = (owner: string): Account => {
    const newAccount: Account = { id: accounts.length + 1, owner, balance: 0 };
    accounts.push(newAccount);
    return newAccount;
};

/**
 * Deposits an amount into an account.
 * @param accountId - The target account ID
 * @param amount - The amount to deposit
 * @returns The updated account or an error message
 */
export const depositToAccount = (accountId: number, amount: number): Account | string => {
    const account = accounts.find(acc => acc.id === accountId);
    if (!account) return "Account not found";
    if (amount <= 0) return "Invalid amount";

    account.balance += amount;
    return account;
};

/**
 * Withdraws an amount from an account.
 * @param accountId - The account ID
 * @param amount - The amount to withdraw
 * @returns The updated account or an error message
 */
export const withdrawFromAccount = (accountId: number, amount: number): Account | string => {
    const account = accounts.find(acc => acc.id === accountId);
    if (!account) return "Account not found";
    if (amount <= 0 || amount > account.balance) return "Invalid or insufficient amount";

    account.balance -= amount;
    return account;
};

/**
 * Transfers money between two accounts.
 * @param fromId - The sender's account ID
 * @param toId - The recipient's account ID
 * @param amount - The amount to transfer
 * @returns The updated accounts or an error message
 */
export const transferBetweenAccounts = (fromId: number, toId: number, amount: number): { fromAccount: Account, toAccount: Account } | string => {
    const fromAccount = accounts.find(acc => acc.id === fromId);
    const toAccount = accounts.find(acc => acc.id === toId);

    if (!fromAccount || !toAccount) return "One or both accounts do not exist";
    if (amount <= 0 || amount > fromAccount.balance) return "Invalid or insufficient amount";

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    return { fromAccount, toAccount };
};
