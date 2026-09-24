import express from "express";
import { getProfile, updateProfile } from "../controllers/analyst.controller.js";

const router = express.Router();

router.get("/profile", getProfile);
router.patch("/profile", updateProfile);

export default router;
