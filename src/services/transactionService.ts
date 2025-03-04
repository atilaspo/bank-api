import { getTransactionsByAccount } from "../repositories/transactionRepository";

/**
 * Retrieves all transactions for a specific account.
 */
export const getAccountTransactions = async (accountId: number) => {
    return await getTransactionsByAccount(accountId);
};
