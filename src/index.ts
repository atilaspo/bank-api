import express from "express";
import cors from "cors";
import { sequelize } from "./config/database";
import accountRoutes from "./routes/accountRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", accountRoutes);

/**
 * Function to start the server after checking the database connection.
 */
const startServer = async () => {
    try {
        console.log("🔍 Checking database connection...");
        
        // Check database connection
        await sequelize.authenticate();
        console.log("✅ PostgreSQL connected successfully.");

        // Sync models with the database
        await sequelize.sync({ alter: true });
        console.log("✅ Database synchronized.");

        // Start the server
        app.listen(PORT, () => {
            console.log(`🏦 Banking server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Unable to connect to the database:", error);
        process.exit(1); // Exit process if DB connection fails
    }
};

// Start the application
startServer();
