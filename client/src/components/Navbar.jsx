import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const displayName = user?.email ? user.email.split("@")[0] : "";

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-xl font-bold text-indigo-400 tracking-tight hover:text-indigo-300 transition"
        >
          🧠 QuizApp
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Active page indicator */}
              <span className="hidden sm:block text-gray-400 text-sm">
                Hey,{" "}
                <span className="text-white font-medium capitalize">
                  {displayName}
                </span>{" "}
                👋
              </span>

              {/* Dashboard link */}
              <Link
                to="/dashboard"
                className={`text-sm transition px-3 py-1.5 rounded-lg ${
                  location.pathname === "/dashboard"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                Dashboard
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm px-4 py-1.5 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`text-sm transition px-3 py-1.5 rounded-lg ${
                  location.pathname === "/login"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-1.5 rounded-lg transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}