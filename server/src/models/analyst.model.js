import mongoose from "mongoose";

const analystSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "M. Okafor" },
    email: { type: String, required: true, default: "analyst@fintech-sentinel.local" },
    role: { type: String, required: true, default: "Lead Risk Analyst" },
    timezone: { type: String, required: true, default: "UTC" },
  },
  { timestamps: true }
);

export default mongoose.model("Analyst", analystSchema);
