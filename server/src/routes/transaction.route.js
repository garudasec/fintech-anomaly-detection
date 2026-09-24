import express from "express";
import {
  createTransaction,
  bulkCreateTransactions,
  getTransactions,
  getTransactionById,
  getRelatedTransactions,
  submitTransactionAnalysis,
  analyzeTransactionById,
  bulkDeleteTransactions,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.post("/", createTransaction);
router.post("/bulk", bulkCreateTransactions);
router.delete("/bulk", bulkDeleteTransactions);
router.get("/", getTransactions);
router.get("/:id", getTransactionById);
router.get("/:id/related", getRelatedTransactions);
router.post("/:id/analysis", submitTransactionAnalysis);
router.post("/:id/analyze", analyzeTransactionById);

export default router;
