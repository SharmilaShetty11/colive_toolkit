import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { StickyNote, PlusCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import API from "../utils/api";

const StickyNotes = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get(`/notes?userId=${user.id}`)
      .then((res) => setNotes(res.data))
      .catch(() => toast.error("Failed to load notes"));
  }, [user.id]);

  const addNote = async () => {
    if (!text.trim()) return toast.error("Write something first!");
    try {
      const res = await API.post("/notes", { text, userId: user.id });
      setNotes((prev) => [...prev, res.data]);
      setText("");
      toast.success("Note added!");
    } catch {
      toast.error("Failed to add note");
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted");
    } catch {
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <StickyNote className="w-6 h-6 text-yellow-500" />
        Sticky Notes
      </h2>

      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
          autoFocus
          className="flex-grow w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/90 dark:bg-white/10 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
        <button
          onClick={addNote}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow transition-all duration-200 active:scale-95"
        >
          <PlusCircle className="w-5 h-5" />
          Add
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className="relative p-4 text-sm font-medium rounded-xl shadow-lg bg-yellow-100/80 dark:bg-yellow-400/20 text-gray-800 dark:text-yellow-100 backdrop-blur-md transition-all hover:rotate-[1deg] hover:scale-[1.01]"
          >
            <button
              onClick={() => deleteNote(note._id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition"
            >
              <X className="w-4 h-4" />
            </button>
            {note.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyNotes;
