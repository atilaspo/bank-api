import express from "express";
import cors from "cors";
import accountRoutes from "./routes/accountRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", accountRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🏦 Banking server running at http://localhost:${PORT}`);
});
