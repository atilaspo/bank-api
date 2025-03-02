import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Account extends Model {
    public id!: number;
    public owner!: string;
    public balance!: number;
}

// Define the schema
Account.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        owner: {
            type: DataTypes.STRING,
            allowNull: false,
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
