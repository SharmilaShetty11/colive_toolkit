import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  CheckCircle,
  Trash2,
  Undo2,
  PlusCircle,
  Link as LinkIcon,
} from "lucide-react";
import API from "../utils/api";

const Tools = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [link, setLink] = useState("");

  useEffect(() => {
    API.get("/groceries")
      .then((res) => setItems(res.data))
      .catch(() => toast.error("Failed to load groceries"));
  }, []);

  const addItem = async () => {
    if (!name || !quantity) return toast.error("Enter name and quantity");

    try {
      const res = await API.post("/groceries", {
        name,
        quantity,
        priority,
        link,
      });
      setItems((prev) => [res.data, ...prev]);
      toast.success("Item added!");
      setName("");
      setQuantity("");
      setPriority("Medium");
      setLink("");
    } catch {
      toast.error("Failed to add item");
    }
  };

  const toggleBought = async (id, current) => {
    try {
      const res = await API.patch(`/groceries/${id}`, {
        bought: !current,
      });
      setItems((prev) => prev.map((i) => (i._id === id ? res.data : i)));
    } catch {
      toast.error("Failed to update item");
    }
  };

  const deleteItem = async (id) => {
    try {
      await API.delete(`/groceries/${id}`);
      setItems((prev) => prev.filter((i) => i._id !== id));
      toast.success("Item deleted");
    } catch {
      toast.error("Failed to delete item");
    }
  };

  const inputStyle =
    "{inputStyle} px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/90 dark:bg-white/10 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none";

  const PRIORITY_COLORS = {
    High: "bg-red-500 text-white",
    Medium: "bg-yellow-500 text-white",
    Low: "bg-green-500 text-white",
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        🛒 Grocery List
      </h2>

      {/* Add Item Form */}
      <div className="flex flex-col gap-3 mb-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item name"
            className={"flex-1" + inputStyle}
          />
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Qty"
            className={"w-24" + inputStyle}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={inputStyle}
          >
            <option value="High">🔥 High</option>
            <option value="Medium">⚖️ Medium</option>
            <option value="Low">🌿 Low</option>
          </select>
        </div>
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Link (product/reel etc)"
          className={inputStyle}
        />
        <button
          onClick={addItem}
          className="mt-1 flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition w-fit cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusCircle className="w-5 h-5" />
          Add Item
        </button>
      </div>

      {/* List */}
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-start bg-white/80 dark:bg-slate-900/50 backdrop-blur-md p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 transition-all hover:scale-[1.01] gap-4"
          >
            <div className="flex flex-col gap-1 w-full">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.bought}
                  onChange={() => toggleBought(item._id, item.bought)}
                  className="accent-blue-600 w-5 h-5"
                />
                <span
                  className={`text-gray-800 dark:text-gray-100 ${
                    item.bought ? "line-through opacity-60" : ""
                  }`}
                >
                  {item.name}{" "}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({item.quantity})
                  </span>
                </span>
              </label>

              {/* Priority badge */}
              <span
                className={`text-xs w-fit mt-0.5 px-2 py-0.5 rounded-full font-medium ${
                  PRIORITY_COLORS[item.priority]
                }`}
              >
                {item.priority} Priority
              </span>

              {/* Link (if exists) */}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-1 hover:underline"
                >
                  <LinkIcon className="w-4 h-4" />
                  View Reference
                </a>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <button
                onClick={() => toggleBought(item._id, item.bought)}
                className={`px-3 py-1 text-white text-sm rounded-lg shadow flex items-center gap-1 transition cursor-pointer ${
                  item.bought
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {item.bought ? (
                  <Undo2 className="w-4 h-4" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                {item.bought ? "Undo" : "Bought"}
              </button>

              <button
                onClick={() => deleteItem(item._id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg shadow flex items-center gap-1 cursor-pointer transition"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tools;
