import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck, User } from "lucide-react";
import { loginUser } from "../api";
import { useAuth } from "../context/useAuth";

export default function Login() {
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload =
        role === "admin"
          ? { username: form.username, password: form.password, role: "admin" }
          : { email: form.email, password: form.password, role: "user" };

      const data = await loginUser(payload);

      if (data.success) {
        console.log(data);
        login(data.user, data.token);
        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(data.message);
      }
    } catch {
      setError("Server error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--bg)" }}
    >
      <div
        className="rounded-2xl p-8 w-full max-w-md"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-1" style={{ color: "var(--text)" }}>
            Welcome Back
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Login to continue your quiz journey
          </p>
        </div>

        {/* ROLE SELECTOR */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            type="button"
            onClick={() => setRole("user")}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all"
            style={{
              background: role === "user" ? "var(--accent)" : "var(--surface)",
              color: role === "user" ? "var(--bg)" : "var(--text)",
              border: "1px solid var(--border)",
            }}
          >
            <User size={18} />
            User
          </button>

          <button
            type="button"
            onClick={() => setRole("admin")}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all"
            style={{
              background: role === "admin" ? "var(--accent)" : "var(--surface)",
              color: role === "admin" ? "var(--bg)" : "var(--text)",
              border: "1px solid var(--border)",
            }}
          >
            <ShieldCheck size={18} />
            Admin
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-400 rounded-xl px-4 py-2.5 mb-4 text-sm">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ADMIN USERNAME OR USER EMAIL */}
          {role === "admin" ? (
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                Admin Username
              </label>
              <input
                name="username"
                type="text"
                required
                value={form.username}
                onChange={handleChange}
                placeholder="Enter admin username"
                className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none transition"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
              />
            </div>
          ) : (
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@email.com"
                className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none transition"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
              />
            </div>
          )}

          {/* PASSWORD */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--text-muted)" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl px-4 py-2.5 pr-12 text-sm focus:outline-none transition"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--text-muted)" }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full font-semibold rounded-xl py-2.5 text-sm transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            {loading ? "Logging in..." : role === "admin" ? "Login as Admin" : "Login"}
          </button>
        </form>

        {role === "user" && (
          <p className="text-sm text-center mt-6" style={{ color: "var(--text-muted)" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold hover:underline transition"
              style={{ color: "var(--accent)" }}
            >
              Register here
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}