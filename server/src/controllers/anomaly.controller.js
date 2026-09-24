import Transaction from "../models/transaction.model.js";

function transactionToAnomaly(txObj) {
  const score = txObj.anomalyScore ?? 0;
  let severity = "medium";
  if (txObj.riskLevel === "critical" || score >= 0.9) severity = "critical";
  else if (txObj.riskLevel === "high" || score >= 0.72) severity = "high";

  let status = "open";
  if (txObj.status === "blocked") status = "escalated";
  else if (txObj.status === "under_review") status = "under_review";
  else if (txObj.status === "completed" || txObj.status === "normal") status = "resolved";
  else if (txObj.status === "flagged" || txObj.status === "anomaly") status = "open";

  // Only return real ML-generated signals. If unsupplied, primarySignal is null.
  const primarySignal =
    txObj.signals && txObj.signals.length > 0
      ? txObj.signals[0]
      : null;

  return {
    anomalyId: `ANM-${txObj.transactionId || txObj._id.toString().substring(18)}`,
    transaction: txObj,
    severity,
    status,
    primarySignal,
    detectedAt: txObj.updatedAt || txObj.transactionTime,
    assignee: null,
  };
}

/**
 * @desc Get list of anomalies derived from flagged / high-risk transactions
 * @route GET /api/anomalies
 */
export const getAnomalies = async (req, res) => {
  try {
    const { severity = "all", status = "all", search = "" } = req.query;

    const queryFilter = {
      $or: [
        { anomalyScore: { $gte: 0.45 } },
        { riskLevel: { $in: ["medium", "high", "critical"] } },
        { status: { $in: ["flagged", "under_review", "blocked", "anomaly"] } },
      ],
    };

    const rawTxs = await Transaction.find(queryFilter).sort({ anomalyScore: -1, transactionTime: -1 });

    let anomalies = rawTxs.map((tx) => transactionToAnomaly(tx.toCleanObject()));

    // Filter by severity
    if (severity && severity !== "all") {
      anomalies = anomalies.filter((a) => a.severity === severity);
    }

    // Filter by status
    if (status && status !== "all") {
      anomalies = anomalies.filter((a) => a.status === status);
    }

    // Filter by search term
    if (search && search.trim()) {
      const s = search.trim().toLowerCase();
      anomalies = anomalies.filter(
        (a) =>
          a.anomalyId.toLowerCase().includes(s) ||
          a.transaction.transactionId.toLowerCase().includes(s) ||
          a.transaction.userId.toLowerCase().includes(s) ||
          a.transaction.merchant.toLowerCase().includes(s)
      );
    }

    return res.status(200).json({
      success: true,
      data: anomalies,
    });
  } catch (error) {
    console.error("Error in getAnomalies:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get top recent un-resolved anomalies
 * @route GET /api/anomalies/recent
 */
export const getRecentAnomalies = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 6;

    const queryFilter = {
      $or: [
        { anomalyScore: { $gte: 0.45 } },
        { riskLevel: { $in: ["medium", "high", "critical"] } },
        { status: { $in: ["flagged", "under_review", "blocked", "anomaly"] } },
      ],
    };

    const rawTxs = await Transaction.find(queryFilter)
      .sort({ anomalyScore: -1, transactionTime: -1 })
      .limit(limit * 3);

    const anomalies = rawTxs
      .map((tx) => transactionToAnomaly(tx.toCleanObject()))
      .filter((a) => a.status !== "resolved")
      .slice(0, limit);

    return res.status(200).json({
      success: true,
      data: anomalies,
    });
  } catch (error) {
    console.error("Error in getRecentAnomalies:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Update investigation status of an anomaly (updates underlying transaction)
 * @route PATCH /api/anomalies/:id/status
 */
export const updateAnomalyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["open", "under_review", "escalated", "resolved"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `status must be one of: ${validStatuses.join(", ")}`,
      });
    }

    let txId = id.startsWith("ANM-") ? id.substring(4) : id;

    let tx = await Transaction.findOne({ transactionId: txId });
    if (!tx && txId.match(/^[0-9a-fA-F]{24}$/)) {
      tx = await Transaction.findById(txId);
    }

    if (!tx) {
      return res.status(404).json({ success: false, message: "Anomaly transaction not found" });
    }

    if (status === "open") tx.status = "flagged";
    else if (status === "under_review") tx.status = "under_review";
    else if (status === "escalated") tx.status = "blocked";
    else if (status === "resolved") tx.status = "completed";

    await tx.save();

    const updatedAnomaly = transactionToAnomaly(tx.toCleanObject());

    return res.status(200).json({
      success: true,
      message: "Anomaly status updated successfully",
      data: updatedAnomaly,
    });
  } catch (error) {
    console.error("Error in updateAnomalyStatus:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
