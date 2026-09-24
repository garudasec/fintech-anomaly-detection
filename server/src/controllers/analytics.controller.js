import Transaction from "../models/transaction.model.js";

/**
 * @desc Get high-level overview metrics calculated strictly from real MongoDB data
 * @route GET /api/analytics/overview
 */
export const getOverviewMetrics = async (req, res) => {
  try {
    const totalTransactions = await Transaction.countDocuments();

    const normalTransactions = await Transaction.countDocuments({
      $or: [{ status: { $in: ["completed", "normal"] } }, { riskLevel: "low" }],
    });

    const anomaliesDetected = await Transaction.countDocuments({
      $or: [
        { anomalyScore: { $gte: 0.45 } },
        { riskLevel: { $in: ["medium", "high", "critical"] } },
        { status: { $in: ["flagged", "under_review", "blocked", "anomaly"] } },
      ],
    });

    const highRisk = await Transaction.countDocuments({
      $or: [{ riskLevel: { $in: ["high", "critical"] } }, { anomalyScore: { $gte: 0.72 } }],
    });

    // Calculate real deltas comparing current 24h to prior 24h period from MongoDB
    const now = new Date();
    const past24h = new Date(now.getTime() - 24 * 3600 * 1000);
    const past48h = new Date(now.getTime() - 48 * 3600 * 1000);

    const normalQuery = {
      $or: [{ status: { $in: ["completed", "normal"] } }, { riskLevel: "low" }],
    };
    const anomalyQuery = {
      $or: [
        { anomalyScore: { $gte: 0.45 } },
        { riskLevel: { $in: ["medium", "high", "critical"] } },
        { status: { $in: ["flagged", "under_review", "blocked", "anomaly"] } },
      ],
    };
    const highRiskQuery = {
      $or: [{ riskLevel: { $in: ["high", "critical"] } }, { anomalyScore: { $gte: 0.72 } }],
    };

    const [
      currTotal, prevTotal,
      currNormal, prevNormal,
      currAnomalies, prevAnomalies,
      currHighRisk, prevHighRisk,
    ] = await Promise.all([
      Transaction.countDocuments({ transactionTime: { $gte: past24h } }),
      Transaction.countDocuments({ transactionTime: { $gte: past48h, $lt: past24h } }),
      Transaction.countDocuments({ ...normalQuery, transactionTime: { $gte: past24h } }),
      Transaction.countDocuments({ ...normalQuery, transactionTime: { $gte: past48h, $lt: past24h } }),
      Transaction.countDocuments({ ...anomalyQuery, transactionTime: { $gte: past24h } }),
      Transaction.countDocuments({ ...anomalyQuery, transactionTime: { $gte: past48h, $lt: past24h } }),
      Transaction.countDocuments({ ...highRiskQuery, transactionTime: { $gte: past24h } }),
      Transaction.countDocuments({ ...highRiskQuery, transactionTime: { $gte: past48h, $lt: past24h } }),
    ]);

    const calculateDelta = (curr, prev) => {
      if (!prev || prev === 0) return 0;
      return Number(((curr - prev) / prev).toFixed(3));
    };

    const lastTx = await Transaction.findOne().sort({ transactionTime: -1 });
    const lastEventAt = lastTx ? lastTx.transactionTime.toISOString() : null;

    return res.status(200).json({
      success: true,
      data: {
        totalTransactions,
        normalTransactions,
        anomaliesDetected,
        highRisk,
        deltas: {
          totalTransactions: calculateDelta(currTotal, prevTotal),
          normalTransactions: calculateDelta(currNormal, prevNormal),
          anomaliesDetected: calculateDelta(currAnomalies, prevAnomalies),
          highRisk: calculateDelta(currHighRisk, prevHighRisk),
        },
        systemStatus: {
          ingestion: "operational",
          detection: "operational",
          lastEventAt,
        },
      },
    });
  } catch (error) {
    console.error("Error in getOverviewMetrics:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get time-series activity data for activity charts
 * @route GET /api/analytics/activity
 */
export const getActivitySeries = async (req, res) => {
  try {
    const range = req.query.range || "24h";
    const now = new Date();
    let hoursOrDays = 24;
    let formatStr = "%Y-%m-%d %H:00";

    if (range === "7d") {
      hoursOrDays = 7 * 24;
      formatStr = "%Y-%m-%d";
    } else if (range === "30d") {
      hoursOrDays = 30 * 24;
      formatStr = "%Y-%m-%d";
    }

    const startDate = new Date(now.getTime() - hoursOrDays * 3600 * 1000);

    const pipeline = [
      {
        $match: {
          transactionTime: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: formatStr, date: "$transactionTime" },
          },
          ts: { $min: "$transactionTime" },
          total: { $sum: 1 },
          anomalies: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $gte: ["$anomalyScore", 0.45] },
                    { $in: ["$riskLevel", ["medium", "high", "critical"]] },
                    { $in: ["$status", ["flagged", "under_review", "blocked", "anomaly"]] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      { $sort: { ts: 1 } },
    ];

    const results = await Transaction.aggregate(pipeline);

    const timePoints = results.map((r) => ({
      t: r._id,
      ts: new Date(r.ts).getTime(),
      total: r.total,
      anomalies: r.anomalies,
    }));

    return res.status(200).json({
      success: true,
      data: timePoints,
    });
  } catch (error) {
    console.error("Error in getActivitySeries:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get count distribution by risk level
 * @route GET /api/analytics/risk-distribution
 */
export const getRiskDistribution = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: {
            $cond: [
              { $or: [{ $eq: ["$analysisState", "pending"] }, { $eq: ["$riskLevel", null] }] },
              "unscored",
              "$riskLevel",
            ],
          },
          count: { $sum: 1 },
        },
      },
    ];

    const results = await Transaction.aggregate(pipeline);

    const distribution = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0,
      unscored: 0,
    };

    results.forEach((r) => {
      if (r._id && distribution.hasOwnProperty(r._id)) {
        distribution[r._id] = r.count;
      }
    });

    return res.status(200).json({
      success: true,
      data: distribution,
    });
  } catch (error) {
    console.error("Error in getRiskDistribution:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get comprehensive analytics summary
 * @route GET /api/analytics/summary
 */
export const getAnalyticsSummary = async (req, res) => {
  try {
    // 1. Amount buckets
    const amountPipeline = [
      {
        $bucket: {
          groupBy: "$amount",
          boundaries: [0, 100, 500, 2000, 10000, Infinity],
          default: "other",
          output: {
            count: { $sum: 1 },
            anomalies: {
              $sum: {
                $cond: [
                  {
                    $or: [
                      { $gte: ["$anomalyScore", 0.45] },
                      { $in: ["$riskLevel", ["medium", "high", "critical"]] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
      },
    ];

    // 2. Hour of day activity
    const hourPipeline = [
      {
        $group: {
          _id: { $hour: "$transactionTime" },
          total: { $sum: 1 },
          anomalies: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $gte: ["$anomalyScore", 0.45] },
                    { $in: ["$riskLevel", ["medium", "high", "critical"]] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ];

    // 3. Geographic activity
    const geoPipeline = [
      {
        $group: {
          _id: {
            country: { $ifNull: ["$location.country", "$location"] },
            code: { $ifNull: ["$location.countryCode", null] },
          },
          total: { $sum: 1 },
          anomalies: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $gte: ["$anomalyScore", 0.45] },
                    { $in: ["$riskLevel", ["medium", "high", "critical"]] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 10 },
    ];

    const [amountRes, hourRes, geoRes] = await Promise.all([
      Transaction.aggregate(amountPipeline),
      Transaction.aggregate(hourPipeline),
      Transaction.aggregate(geoPipeline),
    ]);

    const bucketLabels = ["< $100", "$100–$500", "$500–$2k", "$2k–$10k", "> $10k"];
    const amounts = amountRes.map((b, idx) => ({
      range: bucketLabels[idx] || `$${b._id}`,
      total: b.count,
      anomalies: b.anomalies,
    }));

    const hoursMap = {};
    for (let h = 0; h < 24; h++) hoursMap[h] = { total: 0, anomalies: 0 };
    hourRes.forEach((h) => {
      if (hoursMap[h._id]) {
        hoursMap[h._id] = { total: h.total, anomalies: h.anomalies };
      }
    });
    const hours = Object.keys(hoursMap).map((h) => ({
      hour: `${String(h).padStart(2, "0")}:00`,
      total: hoursMap[h].total,
      anomalies: hoursMap[h].anomalies,
    }));

    const geo = geoRes.map((g) => ({
      country: typeof g._id.country === "string" ? g._id.country : "Unknown",
      code: g._id.code,
      total: g.total,
      anomalies: g.anomalies,
    }));

    const riskCounts = await Transaction.aggregate([
      {
        $group: {
          _id: { $ifNull: ["$riskLevel", "unscored"] },
          count: { $sum: 1 },
        },
      },
    ]);
    const risk = { low: 0, medium: 0, high: 0, critical: 0, unscored: 0 };
    riskCounts.forEach((r) => {
      if (risk.hasOwnProperty(r._id)) risk[r._id] = r.count;
    });

    return res.status(200).json({
      success: true,
      data: {
        amounts,
        hours,
        geo,
        risk,
      },
    });
  } catch (error) {
    console.error("Error in getAnalyticsSummary:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
