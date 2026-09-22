import express from "express";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  getRelatedTransactions,
  submitTransactionAnalysis,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.post("/", createTransaction);
router.get("/", getTransactions);
router.get("/:id", getTransactionById);
router.get("/:id/related", getRelatedTransactions);
router.post("/:id/analysis", submitTransactionAnalysis);

export default router;
