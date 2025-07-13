import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  text: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Note", NoteSchema);