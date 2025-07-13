import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const run = async () => {
  await mongoose.connect(MONGO_URI);
  
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const existing = await User.findOne({ email: "admin@example.com" });

  if (existing) {
    console.log("Admin already exists");
  } else {
    const user = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin"
    });
    await user.save();
    console.log("Admin created ✅");
  }

  mongoose.disconnect();
};

run();
