import express from "express";
import Grocery from "../models/Grocery.js";
const router = express.Router();

// Get all groceries
router.get("/", async (req, res) => {
  const items = await Grocery.find().sort("-createdAt");
  res.json(items);
});

// Add grocery
router.post("/", async (req, res) => {
  const newItem = new Grocery(req.body);
  await newItem.save();
  res.status(201).json(newItem);
});

// Update item (mark as bought or update name)
router.patch("/:id", async (req, res) => {
  const updated = await Grocery.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete item
router.delete("/:id", async (req, res) => {
  await Grocery.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
