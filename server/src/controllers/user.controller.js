import Transaction from "../models/transaction.model.js";

/**
 * @desc Get user investigation profile aggregated from transaction history
 * @route GET /api/users/:userId/profile
 */
export const getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const userTxs = await Transaction.find({ userId }).sort({ transactionTime: -1 });

    if (userTxs.length === 0) {
      // Return a default baseline profile if no transaction history exists yet
      return res.status(200).json({
        success: true,
        data: {
          userId,
          displayName: `User ${userId}`,
          accountAge: "1 yr 0 mo",
          homeLocation: { city: "New York", country: "United States", countryCode: "US" },
          averageAmount: 0,
          typicalWindow: "09:00–18:00 local",
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

    const anomalyCount = userTxs.filter(
      (tx) =>
        (tx.anomalyScore !== null && tx.anomalyScore >= 0.45) ||
        ["high", "critical"].includes(tx.riskLevel) ||
        ["flagged", "under_review", "blocked"].includes(tx.status)
    ).length;

    const priorFlags = userTxs.filter((tx) =>
      ["flagged", "under_review", "blocked"].includes(tx.status)
    ).length;

    // Home location based on latest or most frequent location
    const latestTxObj = userTxs[0].toCleanObject();
    const homeLocation = latestTxObj.location || {
      city: "New York",
      country: "United States",
      countryCode: "US",
    };

    const riskDistribution = { low: 0, medium: 0, high: 0, critical: 0 };
    userTxs.forEach((tx) => {
      if (tx.riskLevel && riskDistribution.hasOwnProperty(tx.riskLevel)) {
        riskDistribution[tx.riskLevel]++;
      } else {
        riskDistribution.low++;
      }
    });

    const recentTransactions = userTxs.slice(0, 5).map((tx) => tx.toCleanObject());

    return res.status(200).json({
      success: true,
      data: {
        userId,
        displayName: `Account ${userId}`,
        accountAge: "2 yrs 4 mo",
        homeLocation,
        averageAmount,
        typicalWindow: "08:00–20:00 local",
        transactionsLast30d: totalTransactions,
        priorFlags,
        totalTransactions,
        totalAmount,
        anomalyCount,
        riskDistribution,
        recentTransactions,
      },
    });
  } catch (error) {
    next(error);
  }
};
