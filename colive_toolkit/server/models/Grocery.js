import mongoose from "mongoose";

const GrocerySchema = new mongoose.Schema(
  {
    name: String,
    quantity: String,
    // Example Mongoose schema field
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    link: {
      type: String,
      default: "",
    },
    bought: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Grocery", GrocerySchema);
