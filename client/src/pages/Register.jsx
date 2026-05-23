import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

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
      const res = await API.post("/register", form);
      if (res.data.success) {
        setSuccess("Account created! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Server error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md shadow-xl">

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-1">Create Account</h2>
          <p className="text-gray-400 text-sm">Join the quiz and test your skills</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 rounded-lg px-4 py-2.5 mb-4 text-sm">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500 text-green-400 rounded-lg px-4 py-2.5 mb-4 text-sm">
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Username
            </label>
            <input
              name="username"
              type="text"
              required
              value={form.username}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition placeholder-gray-500"
              placeholder="johndoe"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition placeholder-gray-500"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-lg py-2.5 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Creating account...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 hover:underline transition">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}