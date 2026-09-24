import Transaction from "../models/transaction.model.js";
import { analyzeTransaction } from "../services/ml.service.js";

/**
 * @desc Create a new financial transaction
 * @route POST /api/transactions
 */
export const createTransaction = async (req, res) => {
  try {
    const { userId, amount, currency, transactionTime, location, status, channel, merchant } = req.body;

    // Validation
    if (!userId || typeof userId !== "string" || !userId.trim()) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    if (amount === undefined || amount === null || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ success: false, message: "amount must be a number greater than 0" });
    }

    if (!location) {
      return res.status(400).json({ success: false, message: "location is required" });
    }

    if (!merchant || typeof merchant !== "string" || !merchant.trim()) {
      return res.status(400).json({ success: false, message: "merchant is required" });
    }

    const validChannels = ["card", "wire", "transfer", "mobile", "atm"];
    if (channel && !validChannels.includes(channel)) {
      return res.status(400).json({ success: false, message: `channel must be one of: ${validChannels.join(", ")}` });
    }

    const txTime = transactionTime ? new Date(transactionTime) : new Date();
    if (isNaN(txTime.getTime())) {
      return res.status(400).json({ success: false, message: "transactionTime must be a valid date" });
    }

    const rand = Math.floor(100000 + Math.random() * 900000);
    const transactionId = req.body.transactionId || `TXN-${rand}`;

    const newTx = await Transaction.create({
      transactionId,
      userId: userId.trim(),
      amount,
      currency: currency || "USD",
      transactionTime: txTime,
      location,
      status: status || "completed",
      channel: channel || "card",
      merchant: merchant.trim(),
      analysisState: "pending",
      anomalyScore: null,
      riskLevel: null,
      signals: [],
    });

    const cleanData = typeof newTx.toCleanObject === "function" ? newTx.toCleanObject() : newTx.toObject();

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: cleanData,
    });
  } catch (error) {
    console.error("Error in createTransaction:", error.stack || error);
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

/**
 * @desc Bulk create financial transactions from CSV data
 * @route POST /api/transactions/bulk
 */
export const bulkCreateTransactions = async (req, res) => {
  try {
    const transactions = req.body;
    if (!Array.isArray(transactions)) {
      return res.status(400).json({ success: false, message: "Expected an array of transactions" });
    }

    // Sort by transactionTime ascending to preserve historical context for ML
    transactions.sort((a, b) => new Date(a.transactionTime) - new Date(b.transactionTime));

    const validChannels = ["card", "wire", "transfer", "mobile", "atm"];
    let imported = 0;
    let failed = 0;
    let analyzed = 0;
    let flagged = 0;
    const errors = [];

    // Process sequentially to ensure historical context for ML is built up
    for (let i = 0; i < transactions.length; i++) {
      const tx = transactions[i];
      const { userId, amount, currency, transactionTime, city, countryCode, channel, merchant } = tx;

      // Validation
      if (!userId || typeof userId !== "string" || !userId.trim()) {
        failed++;
        errors.push({ row: i + 1, error: "userId is required" });
        continue;
      }
      if (amount === undefined || amount === null || isNaN(Number(amount)) || Number(amount) <= 0) {
        failed++;
        errors.push({ row: i + 1, error: "amount must be a positive number" });
        continue;
      }
      const txTime = transactionTime ? new Date(transactionTime) : new Date();
      if (isNaN(txTime.getTime())) {
        failed++;
        errors.push({ row: i + 1, error: "transactionTime must be a valid date" });
        continue;
      }
      if (!city || typeof city !== "string" || !city.trim()) {
        failed++;
        errors.push({ row: i + 1, error: "city is required" });
        continue;
      }
      if (!merchant || typeof merchant !== "string" || !merchant.trim()) {
        failed++;
        errors.push({ row: i + 1, error: "merchant is required" });
        continue;
      }
      if (channel && !validChannels.includes(channel.toLowerCase())) {
        failed++;
        errors.push({ row: i + 1, error: `channel must be one of: ${validChannels.join(", ")}` });
        continue;
      }

      // Create transaction
      const rand = Math.floor(100000 + Math.random() * 900000);
      const transactionId = `TXN-${rand}`;

      let newTx;
      try {
        newTx = await Transaction.create({
          transactionId,
          userId: userId.trim(),
          amount: Number(amount),
          currency: currency || "USD",
          transactionTime: txTime,
          location: { city: city.trim(), countryCode: countryCode ? countryCode.trim() : null, country: null },
          status: "completed",
          channel: channel ? channel.toLowerCase() : "card",
          merchant: merchant.trim(),
          analysisState: "pending",
          anomalyScore: null,
          riskLevel: null,
          signals: [],
        });
        imported++;
      } catch (err) {
        failed++;
        errors.push({ row: i + 1, error: "Database error: " + err.message });
        continue;
      }

      // Analyze transaction
      try {
        const analyzedTx = await analyzeTransaction(newTx);
        if (analyzedTx && analyzedTx.analysisState === 'analyzed') {
          analyzed++;
          if (analyzedTx.riskLevel === 'high' || analyzedTx.riskLevel === 'critical') {
            flagged++;
          }
        }
      } catch (err) {
        // ML error, but transaction was created
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        total: transactions.length,
        imported,
        failed,
        analyzed,
        flagged,
        errors
      }
    });
  } catch (error) {
    console.error("Error in bulkCreateTransactions:", error.stack || error);
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

/**
 * @desc Bulk delete transactions by their transactionIds
 * @route DELETE /api/transactions/bulk
 */
export const bulkDeleteTransactions = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ success: false, message: "Expected an array of ids" });
    }

    const standardIds = [];
    const fallbackSuffixes = [];

    for (const id of ids) {
      if (id.startsWith("TXN-") && id.length === 10) {
        fallbackSuffixes.push(id.substring(4));
      }
      standardIds.push(id);
    }

    let filter = { transactionId: { $in: standardIds } };

    if (fallbackSuffixes.length > 0) {
      filter = {
        $or: [
          { transactionId: { $in: standardIds } },
          { $expr: { $in: [{ $substr: [{ $toString: "$_id" }, 18, 6] }, fallbackSuffixes] } }
        ]
      };
    }

    const result = await Transaction.deleteMany(filter);

    return res.status(200).json({
      success: true,
      data: {
        requested: ids.length,
        deleted: result.deletedCount
      }
    });
  } catch (error) {
    console.error("Error in bulkDeleteTransactions:", error.stack || error);
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

/**
 * @desc Get paginated transactions with search, filter, sorting
 * @route GET /api/transactions
 */
export const getTransactions = async (req, res) => {
  try {
    const {
      search = "",
      status = "all",
      riskLevel = "all",
      country = "all",
      channel,
      minAmount,
      maxAmount,
      from,
      to,
      sortBy = "transactionTime",
      sortDir = "desc",
      page = 1,
      pageSize = 20,
    } = req.query;

    const queryFilter = {};

    // Channel filter
    if (channel && channel !== "all") {
      queryFilter.channel = channel.toLowerCase();
    }

    // Search filter
    if (search && search.trim()) {
      const s = search.trim();
      const regex = new RegExp(s, "i");
      queryFilter.$or = [
        { transactionId: regex },
        { userId: regex },
        { merchant: regex },
        { "location.city": regex },
        { "location.country": regex },
      ];
    }

    // Status filter
    if (status && status !== "all") {
      if (status === "completed") {
        queryFilter.status = { $in: ["completed", "normal"] };
      } else if (status === "flagged") {
        queryFilter.status = { $in: ["flagged", "anomaly"] };
      } else {
        queryFilter.status = status;
      }
    }

    // Risk level filter
    if (riskLevel && riskLevel !== "all") {
      if (riskLevel === "unscored") {
        queryFilter.$or = [{ riskLevel: null }, { analysisState: "pending" }];
      } else {
        queryFilter.riskLevel = riskLevel;
      }
    }

    // Country filter
    if (country && country !== "all") {
      queryFilter.$or = [
        { "location.countryCode": country.toUpperCase() },
        { location: new RegExp(country, "i") },
      ];
    }

    // Amount range filter
    if (minAmount !== undefined || maxAmount !== undefined) {
      queryFilter.amount = {};
      if (minAmount !== undefined && !isNaN(Number(minAmount))) {
        queryFilter.amount.$gte = Number(minAmount);
      }
      if (maxAmount !== undefined && !isNaN(Number(maxAmount))) {
        queryFilter.amount.$lte = Number(maxAmount);
      }
    }

    // Date range filter
    if (from || to) {
      queryFilter.transactionTime = {};
      if (from && !isNaN(new Date(from).getTime())) {
        queryFilter.transactionTime.$gte = new Date(from);
      }
      if (to && !isNaN(new Date(to).getTime())) {
        queryFilter.transactionTime.$lte = new Date(to);
      }
    }

    // Sorting
    const sortOrder = sortDir === "asc" ? 1 : -1;
    let sortOption = {};
    if (sortBy === "amount") {
      sortOption = { amount: sortOrder };
    } else if (sortBy === "anomalyScore") {
      sortOption = { anomalyScore: sortOrder };
    } else {
      sortOption = { transactionTime: sortOrder };
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(pageSize, 10) || 20));
    const skipNum = (pageNum - 1) * limitNum;

    const total = await Transaction.countDocuments(queryFilter);
    const itemsRaw = await Transaction.find(queryFilter)
      .sort(sortOption)
      .skip(skipNum)
      .limit(limitNum);

    const items = itemsRaw.map((tx) =>
      typeof tx.toCleanObject === "function" ? tx.toCleanObject() : tx.toObject()
    );
    const pageCount = Math.ceil(total / limitNum) || 0;

    return res.status(200).json({
      success: true,
      data: {
        items,
        total,
        page: pageNum,
        pageSize: limitNum,
        pageCount,
      },
    });
  } catch (error) {
    console.error("Error in getTransactions:", error.stack || error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get single transaction by ID
 * @route GET /api/transactions/:id
 */
export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    let tx = await Transaction.findOne({ transactionId: id });

    if (!tx && id.match(/^[0-9a-fA-F]{24}$/)) {
      tx = await Transaction.findById(id);
    }

    if (!tx && id.startsWith("TXN-") && id.length === 10) {
      const suffix = id.substring(4);
      tx = await Transaction.findOne({
        $expr: { $eq: [{ $substr: [{ $toString: "$_id" }, 18, 6] }, suffix] }
      });
    }

    if (!tx) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    const cleanData = typeof tx.toCleanObject === "function" ? tx.toCleanObject() : tx.toObject();

    return res.status(200).json({
      success: true,
      data: cleanData,
    });
  } catch (error) {
    console.error("Error in getTransactionById:", error.stack || error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get related transactions by same user
 * @route GET /api/transactions/:id/related
 */
export const getRelatedTransactions = async (req, res) => {
  try {
    const { id } = req.params;
    let targetTx = await Transaction.findOne({ transactionId: id });
    if (!targetTx && id.match(/^[0-9a-fA-F]{24}$/)) {
      targetTx = await Transaction.findById(id);
    }
    if (!targetTx && id.startsWith("TXN-") && id.length === 10) {
      const suffix = id.substring(4);
      targetTx = await Transaction.findOne({
        $expr: { $eq: [{ $substr: [{ $toString: "$_id" }, 18, 6] }, suffix] }
      });
    }

    if (!targetTx) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    const relatedRaw = await Transaction.find({
      userId: targetTx.userId,
      _id: { $ne: targetTx._id },
    })
      .sort({ transactionTime: -1 })
      .limit(6);

    const data = relatedRaw.map((tx) =>
      typeof tx.toCleanObject === "function" ? tx.toCleanObject() : tx.toObject()
    );

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error in getRelatedTransactions:", error.stack || error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Trigger ML analysis for a transaction by ID
 * @route POST /api/transactions/:id/analyze
 */
export const analyzeTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    let tx = await Transaction.findOne({ transactionId: id });
    if (!tx && id.match(/^[0-9a-fA-F]{24}$/)) {
      tx = await Transaction.findById(id);
    }
    if (!tx && id.startsWith("TXN-") && id.length === 10) {
      const suffix = id.substring(4);
      tx = await Transaction.findOne({
        $expr: { $eq: [{ $substr: [{ $toString: "$_id" }, 18, 6] }, suffix] }
      });
    }

    if (!tx) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    // Fetch historical transactions for the same user, excluding current transaction, sorted chronologically
    const historyRaw = await Transaction.find({
      userId: tx.userId,
      _id: { $ne: tx._id },
    }).sort({ transactionTime: 1 });

    const cleanTargetTx = typeof tx.toCleanObject === "function" ? tx.toCleanObject() : tx.toObject();
    const cleanHistory = historyRaw.map((h) =>
      typeof h.toCleanObject === "function" ? h.toCleanObject() : h.toObject()
    );

    let mlResult;
    try {
      mlResult = await analyzeTransaction(cleanTargetTx, cleanHistory);
    } catch (mlError) {
      console.error("ML Service call failed in analyzeTransactionById:", mlError.message || mlError);
      return res.status(502).json({
        success: false,
        message: `ML Service Error: ${mlError.message || "Failed to communicate with Python ML Service"}`,
      });
    }

    const { anomalyScore, riskLevel, signals } = mlResult || {};

    // Validate ML response structure
    const validRiskLevels = ["low", "medium", "high", "critical"];
    if (
      typeof anomalyScore !== "number" ||
      anomalyScore < 0 ||
      anomalyScore > 1 ||
      !riskLevel ||
      !validRiskLevels.includes(riskLevel) ||
      !Array.isArray(signals)
    ) {
      return res.status(502).json({
        success: false,
        message: "ML Service Error: Received invalid response structure from ML service",
      });
    }

    tx.anomalyScore = anomalyScore;
    tx.riskLevel = riskLevel;
    tx.signals = signals;
    tx.analysisState = "analyzed";

    // Auto-flag transaction status if high or critical risk
    if ((riskLevel === "high" || riskLevel === "critical") && (tx.status === "completed" || tx.status === "normal")) {
      tx.status = "flagged";
    }

    await tx.save();

    const cleanData = typeof tx.toCleanObject === "function" ? tx.toCleanObject() : tx.toObject();

    return res.status(200).json({
      success: true,
      message: "Transaction analyzed successfully",
      data: cleanData,
    });
  } catch (error) {
    console.error("Error in analyzeTransactionById:", error.stack || error);
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

/**
 * @desc Submit ML anomaly analysis results (for Python ML Service)
 * @route POST /api/transactions/:id/analysis
 */
export const submitTransactionAnalysis = async (req, res) => {
  try {
    const expectedSecret = process.env.ML_SERVICE_SECRET;
    if (!expectedSecret || !expectedSecret.trim()) {
      return res.status(500).json({
        success: false,
        message: "Server Configuration Error: ML_SERVICE_SECRET environment variable is not configured",
      });
    }

    const secret = req.headers["x-ml-secret"];
    if (!secret || secret !== expectedSecret) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or missing x-ml-secret header",
      });
    }

    const { id } = req.params;
    const { anomalyScore, riskLevel, signals } = req.body;

    // Validate anomalyScore
    if (typeof anomalyScore !== "number" || anomalyScore < 0 || anomalyScore > 1) {
      return res.status(400).json({
        success: false,
        message: "anomalyScore must be a number between 0 and 1",
      });
    }

    // Validate riskLevel
    const validRiskLevels = ["low", "medium", "high", "critical"];
    if (!riskLevel || !validRiskLevels.includes(riskLevel)) {
      return res.status(400).json({
        success: false,
        message: `riskLevel must be one of: ${validRiskLevels.join(", ")}`,
      });
    }

    // Validate signals
    if (signals && !Array.isArray(signals)) {
      return res.status(400).json({ success: false, message: "signals must be an array" });
    }

    let tx = await Transaction.findOne({ transactionId: id });
    if (!tx && id.match(/^[0-9a-fA-F]{24}$/)) {
      tx = await Transaction.findById(id);
    }
    if (!tx && id.startsWith("TXN-") && id.length === 10) {
      const suffix = id.substring(4);
      tx = await Transaction.findOne({
        $expr: { $eq: [{ $substr: [{ $toString: "$_id" }, 18, 6] }, suffix] }
      });
    }

    if (!tx) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    tx.anomalyScore = anomalyScore;
    tx.riskLevel = riskLevel;
    tx.analysisState = "analyzed";
    tx.signals = signals || [];

    // Auto-flag transaction status if high or critical risk
    if ((riskLevel === "high" || riskLevel === "critical") && (tx.status === "completed" || tx.status === "normal")) {
      tx.status = "flagged";
    }

    await tx.save();

    const cleanData = typeof tx.toCleanObject === "function" ? tx.toCleanObject() : tx.toObject();

    return res.status(200).json({
      success: true,
      message: "Analysis updated successfully",
      data: cleanData,
    });
  } catch (error) {
    console.error("Error in submitTransactionAnalysis:", error.stack || error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
