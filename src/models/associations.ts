import { UserModel } from "./userModel";
import { AccountModel } from "./accountModel";
import { TransactionModel } from "./transactionModel";

// A user can have many accounts
UserModel.hasMany(AccountModel, { foreignKey: "ownerId", as: "accounts" });
AccountModel.belongsTo(UserModel, { foreignKey: "ownerId", as: "owner" });

// An account can have many transactions
AccountModel.hasMany(TransactionModel, { foreignKey: "accountId", as: "transactions" });
TransactionModel.belongsTo(AccountModel, { foreignKey: "accountId", as: "account" });

export { UserModel, AccountModel, TransactionModel };
