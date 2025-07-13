import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ClipboardList,
  StickyNote,
  Settings as SettingsIcon,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const tools = [
    {
      href: "/tools",
      icon: (
        <ClipboardList className="w-6 h-6 text-indigo-500 group-hover:text-indigo-600 transition" />
      ),
      label: "Grocery List",
    },
    {
      href: "/sticky-notes",
      icon: (
        <StickyNote className="w-6 h-6 text-emerald-500 group-hover:text-emerald-600 transition" />
      ),
      label: "Sticky Notes",
    },
    {
      href: "/settings",
      icon: (
        <SettingsIcon className="w-6 h-6 text-cyan-500 group-hover:text-cyan-600 transition" />
      ),
      label: "Settings",
    },
  ];

  return (
    <div className="p-6 animate-fade-in-up">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        {greeting}, {user?.name || "User"} 👋
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Welcome to your internal tool dashboard.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map(({ href, icon, label }) => (
          <Link
            key={label}
            to={href}
            className="group p-6 rounded-2xl border border-transparent bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-indigo-300 dark:hover:border-indigo-500"
          >
            <div className="mb-3">{icon}</div>
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
