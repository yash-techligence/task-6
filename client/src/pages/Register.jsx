import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = await registerUser(form);
      if (data.success) {
        setSuccess("Account created! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
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
          <h2
            className="text-3xl font-bold mb-1"
            style={{ color: "var(--text)" }}
          >
            Create Account
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Join the quiz and test your skills
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-400 rounded-xl px-4 py-2.5 mb-4 text-sm">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/40 text-green-400 rounded-xl px-4 py-2.5 mb-4 text-sm">
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--text-muted)" }}
            >
              Username
            </label>
            <input
              name="username"
              type="text"
              required
              value={form.username}
              onChange={handleChange}
              placeholder="johndoe"
              className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none transition"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
            />
          </div>

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

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--text-muted)" }}
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none transition"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full font-semibold rounded-xl py-2.5 text-sm transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Creating account...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p
          className="text-sm text-center mt-6"
          style={{ color: "var(--text-muted)" }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold hover:underline transition"
            style={{ color: "var(--accent)" }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}