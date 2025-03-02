import { Sequelize } from "sequelize";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Create a Sequelize instance
export const sequelize = new Sequelize(
    process.env.DB_NAME || "bank_db",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "password",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        logging: false, // Disable logging for cleaner output
    }
);

// Test the connection
sequelize.authenticate()
    .then(() => console.log("✅ PostgreSQL connected successfully."))
    .catch(err => console.error("❌ PostgreSQL connection error:", err));
