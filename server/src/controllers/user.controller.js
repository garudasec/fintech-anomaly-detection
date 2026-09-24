import Transaction from "../models/transaction.model.js";

/**
 * @desc Get user profile statistics calculated strictly from MongoDB transaction history
 * @route GET /api/users/:userId/profile
 */
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const userTxs = await Transaction.find({ userId }).sort({ transactionTime: -1 });

    if (userTxs.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          userId,
          displayName: userId,
          accountAge: null,
          homeLocation: null,
          averageAmount: 0,
          typicalWindow: null,
          transactionsLast30d: 0,
          priorFlags: 0,
          totalTransactions: 0,
          totalAmount: 0,
          anomalyCount: 0,
          riskDistribution: { low: 0, medium: 0, high: 0, critical: 0 },
          recentTransactions: [],
        },
      });
    }

    const totalTransactions = userTxs.length;
    const totalAmount = userTxs.reduce((sum, tx) => sum + (tx.amount || 0), 0);
    const averageAmount = Math.round(totalAmount / totalTransactions);

    // Calculate real account age based on earliest recorded transaction
    const earliestTime = new Date(userTxs[userTxs.length - 1].transactionTime);
    const now = new Date();
    const diffMonths = (now.getFullYear() - earliestTime.getFullYear()) * 12 + (now.getMonth() - earliestTime.getMonth());
    const yrs = Math.floor(diffMonths / 12);
    const mos = Math.max(0, diffMonths % 12);
    const accountAge = yrs > 0 ? `${yrs} yrs ${mos} mo` : `${mos} mo`;

    // Determine most frequent transaction location
    const locationCounts = new Map();
    userTxs.forEach((tx) => {
      const clean = tx.toCleanObject();
      if (clean.location && clean.location.city) {
        const key = JSON.stringify(clean.location);
        locationCounts.set(key, (locationCounts.get(key) || 0) + 1);
      }
    });

    let homeLocation = null;
    let maxCount = 0;
    locationCounts.forEach((count, locKey) => {
      if (count > maxCount) {
        maxCount = count;
        try {
          homeLocation = JSON.parse(locKey);
        } catch (e) {}
      }
    });

    // Determine typical window from user transaction hours
    const hours = userTxs.map((tx) => new Date(tx.transactionTime).getHours());
    const minHour = Math.min(...hours);
    const maxHour = Math.max(...hours);
    const typicalWindow = `${String(minHour).padStart(2, "0")}:00–${String(maxHour).padStart(2, "0")}:00 local`;

    // Calculate 30-day transactions count
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
    const transactionsLast30d = userTxs.filter(
      (tx) => new Date(tx.transactionTime) >= thirtyDaysAgo
    ).length;

    const anomalyCount = userTxs.filter(
      (tx) =>
        (tx.anomalyScore !== null && tx.anomalyScore >= 0.45) ||
        ["high", "critical"].includes(tx.riskLevel) ||
        ["flagged", "under_review", "blocked"].includes(tx.status)
    ).length;

    const priorFlags = userTxs.filter((tx) =>
      ["flagged", "under_review", "blocked"].includes(tx.status)
    ).length;

    const riskDistribution = { low: 0, medium: 0, high: 0, critical: 0 };
    userTxs.forEach((tx) => {
      if (tx.riskLevel && riskDistribution.hasOwnProperty(tx.riskLevel)) {
        riskDistribution[tx.riskLevel]++;
      } else if (tx.riskLevel === "low") {
        riskDistribution.low++;
      }
    });

    const recentTransactions = userTxs.slice(0, 5).map((tx) => tx.toCleanObject());

    return res.status(200).json({
      success: true,
      data: {
        userId,
        displayName: userId,
        accountAge,
        homeLocation,
        averageAmount,
        typicalWindow,
        transactionsLast30d,
        priorFlags,
        totalTransactions,
        totalAmount,
        anomalyCount,
        riskDistribution,
        recentTransactions,
      },
    });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
