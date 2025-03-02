import  { AccountModel }  from "../models/accountModel";

/**
 * Retrieves all accounts from the database.
 */
export const findAllAccounts = async (): Promise<AccountModel[]> => {
    return await AccountModel.findAll();
};

/**
 * Finds an account by its ID.
 */
export const findAccountById = async (id: number): Promise<AccountModel | null> => {
    return await AccountModel.findByPk(id);
};

/**
 * Creates a new account in the database.
 */
export const createAccount = async (ownerId: number): Promise<AccountModel> => {
    return await AccountModel.create({ ownerId, balance: 0 });
};

/**
 * Updates an account balance.
 */
export const updateAccount = async (account: AccountModel): Promise<void> => {
    await account.save();
};
