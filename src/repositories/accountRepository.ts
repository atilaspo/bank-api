import { Account } from "../models/accountModel";

/**
 * Retrieves all accounts from the database.
 */
export const findAllAccounts = async (): Promise<Account[]> => {
    return await Account.findAll();
};

/**
 * Finds an account by its ID.
 */
export const findAccountById = async (id: number): Promise<Account | null> => {
    return await Account.findByPk(id);
};

/**
 * Creates a new account in the database.
 */
export const createAccount = async (owner: string): Promise<Account> => {
    return await Account.create({ owner, balance: 0 });
};

/**
 * Updates an account balance.
 */
export const updateAccount = async (account: Account): Promise<void> => {
    await account.save();
};
