import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { useRef } from "react";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef(null);

  // Autofocus on email field
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Email and password are required");
        return;
      }
      console.log("Login attempt for:", email);
      toast.loading("Authenticating...", { id: "login" });

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      login(res.data); // res.data = { token, user }
      toast.success(`Welcome back, ${res.data.user.name}!`, { id: "login" });
      navigate("/");
    } catch {
      toast.error("Login failed. Please check your credentials.", {
        id: "login",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up transition-all">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Sign in to your portal
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-white/10 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-white/10 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Submit Button with Icon and Spinner */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <LogIn className="w-5 h-5" />
          )}
          <span>{loading ? "Logging in..." : "Login"}</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
