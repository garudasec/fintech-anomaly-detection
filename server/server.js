import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./src/config/db.js";
import transactionRoutes from "./src/routes/transaction.route.js";
import anomalyRoutes from "./src/routes/anomaly.route.js";
import analyticsRoutes from "./src/routes/analytics.route.js";
import userRoutes from "./src/routes/user.route.js";
import analystRoutes from "./src/routes/analyst.route.js";
import errorHandler from "./src/middleware/error.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Basic health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "FinTech Anomaly API is running" });
});

// API Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/anomalies", anomalyRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/analyst", analystRoutes);

// Centralized error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`FinTech server running on port ${PORT}`);
});
