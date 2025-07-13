import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import groceryRoutes from "./routes/grocery.js";
import authRoutes from './routes/auth.js';
import noteRoutes from './routes/notes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.use("/api/groceries", groceryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 7000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("MongoDB connection failed:", err.message);
});
