import mongoose from "mongoose";

const signalSchema = new mongoose.Schema(
  {
    kind: { type: String, required: true },
    label: { type: String, required: true },
    weight: { type: Number, required: true, min: 0, max: 1 },
    detail: { type: String, required: true },
  },
  { _id: false }
);

const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      unique: true,
      index: true,
    },

    userId: {
      type: String,
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "USD",
    },

    transactionTime: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },

    location: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    status: {
      type: String,
      enum: ["completed", "pending", "flagged", "under_review", "blocked", "normal", "anomaly"],
      default: "completed",
    },

    channel: {
      type: String,
      enum: ["card", "wire", "transfer", "mobile", "atm"],
      default: "card",
    },

    merchant: {
      type: String,
      default: "Merchant Store",
    },

    anomalyScore: {
      type: Number,
      min: 0,
      max: 1,
      default: null,
    },

    riskLevel: {
      type: String,
      enum: ["low", "medium", "high", "critical", null],
      default: null,
    },

    analysisState: {
      type: String,
      enum: ["pending", "analyzed", "unavailable"],
      default: "pending",
    },

    signals: {
      type: [signalSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook (Mongoose 9 compatible: no next callback)
transactionSchema.pre("save", function () {
  if (!this.transactionId) {
    const rand = Math.floor(100000 + Math.random() * 900000);
    this.transactionId = `TXN-${rand}`;
  }
});

// Helper method to format location object cleanly for API responses
transactionSchema.methods.toCleanObject = function () {
  const obj = this.toObject();
  
  // Format transactionId if fallback needed
  if (!obj.transactionId) {
    obj.transactionId = `TXN-${obj._id.toString().substring(18)}`;
  }

  // Format location
  if (typeof obj.location === "string") {
    const parts = obj.location.split(",").map((s) => s.trim());
    obj.location = {
      city: parts[0] || "Unknown",
      country: parts[1] || "United States",
      countryCode: parts[1] ? parts[1].substring(0, 2).toUpperCase() : "US",
    };
  } else if (!obj.location || typeof obj.location !== "object") {
    obj.location = { city: "New York", country: "United States", countryCode: "US" };
  } else {
    obj.location = {
      city: obj.location.city || "New York",
      country: obj.location.country || "United States",
      countryCode: obj.location.countryCode || "US",
    };
  }

  // Format status backward compatibility
  if (obj.status === "normal") obj.status = "completed";
  if (obj.status === "anomaly") obj.status = "flagged";

  return obj;
};

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
