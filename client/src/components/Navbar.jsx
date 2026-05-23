import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  LayoutDashboard,
  Trophy,
  LogOut,
  LogIn,
  UserPlus,
  Sun,
  Moon,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-xl border-b"
      style={{
        background:
          theme === "dark" ? "rgba(0,0,0,0.4)" : "rgba(244,244,240,0.7)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold text-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            Q
          </div>
          <div className="hidden sm:block">
            <h1
              className="font-extrabold text-lg tracking-tight leading-none"
              style={{ color: "var(--text)" }}
            >
              QuizPlatform
            </h1>
            <p
              className="text-[11px] mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              Smart Quiz Experience
            </p>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 border"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
            title={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            <>
              {/* Dashboard */}
              <Link
                to="/dashboard"
                className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 border"
                style={
                  location.pathname === "/dashboard"
                    ? {
                        background: "var(--accent)",
                        color: "var(--bg)",
                        borderColor: "var(--accent)",
                      }
                    : {
                        background: "var(--surface)",
                        color: "var(--text-muted)",
                        borderColor: "var(--border)",
                      }
                }
              >
                <LayoutDashboard size={18} />
              </Link>

              {/* Leaderboard */}
              <Link
                to="/leaderboard"
                className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 border"
                style={
                  location.pathname === "/leaderboard"
                    ? {
                        background: "var(--accent)",
                        color: "var(--bg)",
                        borderColor: "var(--accent)",
                      }
                    : {
                        background: "var(--surface)",
                        color: "var(--text-muted)",
                        borderColor: "var(--border)",
                      }
                }
              >
                <Trophy size={18} />
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 border"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#f87171";
                  e.currentTarget.style.borderColor = "rgba(248,113,113,0.3)";
                  e.currentTarget.style.background = "rgba(239,68,68,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--surface)";
                }}
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 border"
                style={
                  location.pathname === "/login"
                    ? {
                        background: "var(--accent)",
                        color: "var(--bg)",
                        borderColor: "var(--accent)",
                      }
                    : {
                        background: "var(--surface)",
                        color: "var(--text-muted)",
                        borderColor: "var(--border)",
                      }
                }
              >
                <LogIn size={18} />
              </Link>

              {/* Register */}
              <Link
                to="/register"
                className="w-11 h-11 rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
              >
                <UserPlus size={18} />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}