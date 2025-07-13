import express from "express";
import Note from "../models/Note.js";
const router = express.Router();

// Get user notes
router.get("/", async (req, res) => {
  const { userId } = req.query;
  const notes = await Note.find({ userId });
  res.json(notes);
});

// Add note
router.post("/", async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.status(201).json(note);
});

// Delete note
router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
