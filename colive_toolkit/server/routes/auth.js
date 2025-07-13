import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import adminOnly from "../middleware/adminOnly.js";
import dotenv from "dotenv";

// ✅ Load env variables
dotenv.config();

const router = express.Router();

router.post("/register", adminOnly, async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashed, role });
  await newUser.save();
  res.status(201).json({ message: "User created" });
});

router.post("/login", async (req, res) => {
  console.log("JWT_SECRET at runtime:", process.env.JWT_SECRET);
  const { email, password } = req.body;
  console.log("Login attempt for:", email);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET, // ✅ use directly
    { expiresIn: "1d" }
  );

  console.log("User logged in:", user._id);
  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
    },
  });
});

router.get("/users", adminOnly, async (req, res) => {
  console.log("Fetching all users");
  const users = await User.find().select("-password");
  res.json(users);
});

router.delete("/users/:id", adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;