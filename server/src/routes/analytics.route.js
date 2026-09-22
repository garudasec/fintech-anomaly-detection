import express from "express";
import {
  getOverviewMetrics,
  getActivitySeries,
  getRiskDistribution,
  getAnalyticsSummary,
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/overview", getOverviewMetrics);
router.get("/activity", getActivitySeries);
router.get("/risk-distribution", getRiskDistribution);
router.get("/summary", getAnalyticsSummary);

export default router;
