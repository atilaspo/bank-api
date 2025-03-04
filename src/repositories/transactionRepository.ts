import { TransactionModel } from "../models/transactionModel";

/**
 * Registers a new transaction.
 */
export const createTransaction = async (accountId: number, type: "deposit" | "withdrawal" | "transfer", amount: number): Promise<TransactionModel> => {
    return await TransactionModel.create({ accountId, type, amount });
};

/**
 * Retrieves all transactions for an account.
 */
export const getTransactionsByAccount = async (accountId: number): Promise<TransactionModel[]> => {
    return await TransactionModel.findAll({ where: { accountId } });
};