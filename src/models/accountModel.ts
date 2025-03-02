import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { UserModel } from "./userModel";

class AccountModel extends Model {
    public id!: number;
    public ownerId!: number;
    public balance!: number;
}

AccountModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: UserModel,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        balance: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: "accounts",
    }
);

export { AccountModel };
