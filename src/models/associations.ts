import { UserModel } from "./userModel";
import { AccountModel } from "./accountModel";
import { TransactionModel } from "./transactionModel";

// Un usuario puede tener muchas cuentas
UserModel.hasMany(AccountModel, { foreignKey: "ownerId", as: "accounts" });
AccountModel.belongsTo(UserModel, { foreignKey: "ownerId", as: "owner" });

// Una cuenta puede tener muchas transacciones
AccountModel.hasMany(TransactionModel, { foreignKey: "accountId", as: "transactions" });
TransactionModel.belongsTo(AccountModel, { foreignKey: "accountId", as: "account" });

export { UserModel, AccountModel, TransactionModel };
