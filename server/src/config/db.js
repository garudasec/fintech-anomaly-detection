import mongoose from "mongoose";
import dns from "dns";

// Force public Google DNS resolution for MongoDB Atlas SRV records on Windows/WSL
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
  // Fallback gracefully
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
