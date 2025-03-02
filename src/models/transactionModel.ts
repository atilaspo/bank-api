import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { AccountModel } from "./accountModel";

class TransactionModel extends Model {
    public id!: number;
    public accountId!: number;
    public type!: "deposit" | "withdrawal" | "transfer";
    public amount!: number;
    public timestamp!: Date;
}

TransactionModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        accountId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: AccountModel,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        type: {
            type: DataTypes.ENUM("deposit", "withdrawal", "transfer"),
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "transactions",
    }
);

export { TransactionModel };