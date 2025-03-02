import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class UserModel extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public role!: string;
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            allowNull: false,
            defaultValue: "user",
        },
    },
    {
        sequelize,
        tableName: "users",
    }
);

export { UserModel };
