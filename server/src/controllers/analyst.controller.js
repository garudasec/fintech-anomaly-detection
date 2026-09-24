import Analyst from "../models/analyst.model.js";

// Ensure a default profile exists and return it
export const getProfile = async (req, res) => {
  try {
    let profile = await Analyst.findOne();
    if (!profile) {
      profile = await Analyst.create({
        name: "M. Okafor",
        email: "analyst@fintech-sentinel.local",
        role: "Lead Risk Analyst",
        timezone: "UTC",
      });
    }
    return res.status(200).json({ success: true, data: profile });
  } catch (error) {
    console.error("Error in getProfile:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, role, timezone } = req.body;
    let profile = await Analyst.findOne();
    if (!profile) {
      profile = new Analyst();
    }
    if (name) profile.name = name;
    if (email) profile.email = email;
    if (role) profile.role = role;
    if (timezone) profile.timezone = timezone;

    await profile.save();
    return res.status(200).json({ success: true, data: profile });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
