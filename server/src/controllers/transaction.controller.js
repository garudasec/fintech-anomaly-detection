import Transaction from "../models/transaction.model.js";

const createTransaction = async (req, res) => {
  try {
    const { userId, amount, transactionTime, location } = req.body;

    // validation
    if (!userId || !amount || !transactionTime || !location) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // create transaction
    const transaction = await Transaction.create({
      userId,
      amount,
      transactionTime,
      location,
    });

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { createTransaction, getTransactions };