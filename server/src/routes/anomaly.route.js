import express from "express";
import {
  getAnomalies,
  getRecentAnomalies,
  updateAnomalyStatus,
} from "../controllers/anomaly.controller.js";

const router = express.Router();

router.get("/", getAnomalies);
router.get("/recent", getRecentAnomalies);
router.patch("/:id/status", updateAnomalyStatus);

export default router;
