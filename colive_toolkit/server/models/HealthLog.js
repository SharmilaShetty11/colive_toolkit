import mongoose from "mongoose";

const daySchema = new mongoose.Schema({
  sleep: String,
  breakfast: String,
  lunch: String,
  dinner: String,
  junk: String,
  workout: String,
  water: String,
});

const healthLogSchema = new mongoose.Schema({
  week: { type: String, default: () => new Date().toISOString().slice(0, 10) },
  days: {
    Mon: daySchema,
    Tue: daySchema,
    Wed: daySchema,
    Thu: daySchema,
    Fri: daySchema,
    Sat: daySchema,
    Sun: daySchema,
  },
});

export default mongoose.model("HealthLog", healthLogSchema);
