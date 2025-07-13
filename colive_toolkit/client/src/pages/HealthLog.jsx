import { useState, useEffect } from "react";
import API from "../utils/api";
import { toast } from "react-hot-toast";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const fields = ["sleep", "breakfast", "lunch", "dinner", "junk", "workout", "water"];

const HealthLog = () => {
  const [log, setLog] = useState({});
  const [editing, setEditing] = useState({}); // { "Mon-sleep": "value" }

  useEffect(() => {
    API.get("/health").then((res) => setLog(res.data.days));
  }, []);

  const startEdit = (day, field) => {
    setEditing({ [`${day}-${field}`]: log[day]?.[field] || "" });
  };

  const cancelEdit = (key) => {
    setEditing((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const saveEdit = async (day, field, key) => {
    try {
      const value = editing[key];
      await API.patch(`/health/${day}/${field}`, { value });
      setLog((prev) => ({
        ...prev,
        [day]: { ...prev[day], [field]: value },
      }));
      cancelEdit(key);
      toast.success("Saved!");
    } catch {
      toast.error("Failed to save");
    }
  };

  const copyMarkdown = () => {
    let md = `| Day | ${fields.map(f => f[0].toUpperCase() + f.slice(1)).join(" | ")} |\n`;
    md += `| --- | ${fields.map(() => "---").join(" | ")} |\n`;
    days.forEach(day => {
      md += `| ${day} | ${fields.map(f => log[day]?.[f] || "").join(" | ")} |\n`;
    });
    navigator.clipboard.writeText(md);
    toast.success("Copied to clipboard!");
  };

  const resetTable = async () => {
    if (!window.confirm("Clear all data?")) return;
    const res = await API.delete("/health");
    setLog(res.data.days);
    toast.success("Table reset");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Weekly Health Tracker</h2>
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Day</th>
            {fields.map((field) => (
              <th key={field} className="border p-2 capitalize">{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <td className="border p-2 font-semibold">{day}</td>
              {fields.map((field) => {
                const key = `${day}-${field}`;
                const isEditing = editing[key] !== undefined;
                return (
                  <td key={field} className="border p-2 text-center">
                    {isEditing ? (
                      <div className="flex gap-1 items-center justify-center">
                        <input
                          value={editing[key]}
                          onChange={(e) => setEditing({ ...editing, [key]: e.target.value })}
                          className="border px-2 py-1 w-24 text-sm"
                        />
                        <button onClick={() => saveEdit(day, field, key)} className="text-green-600">✔</button>
                        <button onClick={() => cancelEdit(key)} className="text-red-600">✖</button>
                      </div>
                    ) : (
                      <span onClick={() => startEdit(day, field)} className="cursor-pointer hover:bg-yellow-100 px-2">
                        {log[day]?.[field] || "-"}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex gap-4">
        <button onClick={copyMarkdown} className="bg-blue-600 text-white px-4 py-2 rounded">Copy Table</button>
        <button onClick={resetTable} className="bg-red-600 text-white px-4 py-2 rounded">Reset Table</button>
      </div>
    </div>
  );
};

export default HealthLog;