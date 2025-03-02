import { Sequelize } from "sequelize";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Create a Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME || "bank_db",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "password",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        logging: false, // Disable logging for cleaner output
    }
);

import "../models/associations";

export { sequelize };
