import express from "express";
import HealthLog from "../models/HealthLog.js";

const router = express.Router();

// Get current week log
router.get("/", async (req, res) => {
  let log = await HealthLog.findOne();
  if (!log) {
    log = await HealthLog.create({});
  }
  res.json(log);
});

// Update a specific cell
router.patch("/:day/:field", async (req, res) => {
  const { day, field } = req.params;
  const { value } = req.body;

  const log = await HealthLog.findOne();
  if (!log) return res.status(404).json({ message: "Log not found" });

  log.days[day][field] = value;
  await log.save();
  res.json(log);
});

// Reset log
router.delete("/", async (req, res) => {
  await HealthLog.deleteMany();
  const newLog = await HealthLog.create({});
  res.json(newLog);
});

export default router;