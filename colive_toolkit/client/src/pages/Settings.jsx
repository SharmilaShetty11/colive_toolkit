import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";
import { Sun, Moon, UserPlus, Trash2 } from "lucide-react";
import API from "../utils/api";

const Settings = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });

  const [users, setUsers] = useState([]);
  const { dark, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/auth/users");
        setUsers(res.data);
      } catch (err) {
        toast.error("Failed to fetch users");
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error("Fill all fields");
      return;
    }

    try {
      await API.post("/auth/register", newUser);
      const res = await API.get("/auth/users");
      setUsers(res.data);
      setNewUser({ name: "", email: "", password: "", role: "staff" });
      toast.success("User created successfully!");
    } catch (err) {
      toast.error("Failed to create user");
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/auth/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch (err) {
      toast.error("Failed to delete user");
      console.error(err);
    }
  };

  const inputStyle =
    "input-style px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/90 dark:bg-white/10 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          ⚙️ Settings
        </h2>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-slate-800/70 text-gray-800 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Create User */}
      <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-md p-6 rounded-xl shadow-md mb-8 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-blue-500" /> Create New User
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className={inputStyle}
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className={inputStyle}
          >
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          onClick={handleCreate}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow transition"
        >
          Create User
        </button>
      </div>

      {/* User List */}
      <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-md rounded-xl shadow border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 px-6 pt-5 pb-2">
          👥 All Users
        </h3>
        <ul className="divide-y">
          {users.map((u) => (
            <li
              key={u._id}
              className="p-4 flex justify-between items-center text-gray-800 dark:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-white/5 transition"
            >
              <div>
                <div className="font-semibold">{u.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {u.email}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Role: {u.role}
                </span>
                <button
                  onClick={() => deleteUser(u._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Settings;
