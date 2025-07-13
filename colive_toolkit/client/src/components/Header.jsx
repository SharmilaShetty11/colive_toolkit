import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Home,
  Wrench,
  Settings,
  LogIn,
  LogOut,
} from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="backdrop-blur-md bg-white/40 dark:bg-white/10 shadow-md dark:shadow-none border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center transition-all duration-300">
      {/* Navigation */}
      <nav className="flex gap-6 text-sm font-semibold text-gray-800 dark:text-gray-100">
        {user ? (
          <>
            <Link
              to="/"
              className="flex items-center gap-2 hover:text-cyan-600 dark:hover:text-cyan-400 transition-transform duration-200 hover:scale-105"
            >
              <Home className="w-4 h-4 text-cyan-500" />
              Dashboard
            </Link>
            <Link
              to="/tools"
              className="flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-transform duration-200 hover:scale-105"
            >
              <Wrench className="w-4 h-4 text-emerald-500" />
              Tools
            </Link>
            {user.role === "admin" && (
              <Link
                to="/settings"
                className="flex items-center gap-2 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-transform duration-200 hover:scale-105"
              >
                <Settings className="w-4 h-4 text-fuchsia-500" />
                Admin Panel
              </Link>
            )}
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-transform duration-200 hover:scale-105"
          >
            <LogIn className="w-4 h-4 text-indigo-500" />
            Sign In
          </Link>
        )}
      </nav>

      {/* User Info */}
      {user && (
        <div className="flex items-center gap-4 text-sm text-gray-800 dark:text-gray-100 animate-fade-in">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name
            )}&background=random`}
            alt="avatar"
            className="w-9 h-9 rounded-full border-2 border-white/40 shadow-md transition-transform duration-300 hover:scale-105"
          />
          <span className="font-medium flex items-center gap-1">
            {user.name}
          </span>
          <button
            onClick={logout}
            className="ml-2 flex items-center gap-2 text-rose-600 dark:text-rose-400 hover:underline transition-transform duration-200 hover:scale-105"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
