import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Tools from "./pages/Tools";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import StickyNotes from "./pages/StickyNotes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1f2937", // dark gray
            color: "#fff",
            borderRadius: "8px",
            padding: "12px 16px",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#f0fdf4",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fef2f2",
            },
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="tools"
            element={
              <ProtectedRoute>
                <Tools />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="sticky-notes"
            element={
              <ProtectedRoute>
                <StickyNotes />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
