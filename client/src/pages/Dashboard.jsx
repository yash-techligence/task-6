import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuizzes } from "../api";
import QuizCard from "../components/QuizCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [available, setAvailable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = localStorage.getItem("username") ?? "User";
  const isAdmin = localStorage.getItem("role") === "admin";

  // // Redirect to login if no token
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) navigate("/login");
  // }, [navigate]);

  // Fetch quizzes from backend
  useEffect(() => {
    fetchQuizzes()
      .then(setAvailable)
      .catch(() => setError("Could not load quizzes."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen p-6 md:p-10" style={{ background: "#080808" }}>
      <div className="max-w-6xl mx-auto">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-black text-sm"
              style={{ background: "var(--accent)" }}
            >
              Q
            </div>
            <span className="text-white font-bold tracking-tight">
              QuizPlatform
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Admin-only: Create Quiz button */}
            {isAdmin && (
              <button
                onClick={() => navigate("/quiz/create")}
                className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "var(--accent)", color: "#000" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Create Quiz
              </button>
            )}

            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="text-xs text-white/60 hover:text-red-400 transition-colors duration-200 border border-white/10 hover:border-red-400/30 px-4 py-2 rounded-xl"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* ── Welcome ── */}
        <div className="mb-10">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-2"
            style={{ color: "var(--accent)" }}
          >
            Welcome back
          </p>
          <h1 className="text-5xl font-extrabold text-white leading-tight">
            {username}
          </h1>
          <p className="text-white/60 mt-2">
            Ready to test your knowledge today?
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            {
              label: "Available",
              value: loading ? "—" : available.length,
              accent: false,
            },
            { label: "Attempted", value: "—", accent: false },
            { label: "Avg Score", value: "—", accent: true },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-5"
            >
              <p
                className="text-3xl font-extrabold text-white"
                style={stat.accent ? { color: "var(--accent)" } : {}}
              >
                {stat.value}
              </p>
              <p className="text-white/50 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Available Quizzes ── */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="w-1.5 h-5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            <h2 className="text-lg font-bold text-white">Available Quizzes</h2>
            {!loading && (
              <span className="text-white/20 text-sm">{available.length}</span>
            )}
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 animate-pulse"
                >
                  <div className="h-4 bg-white/10 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-white/10 rounded w-1/2 mb-2" />
                  <div className="h-3 bg-white/10 rounded w-1/3" />
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-5 py-4">
              {error}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && available.length === 0 && (
            <p className="text-white/30 text-sm">No quizzes available yet.</p>
          )}

          {/* Quiz cards */}
          {!loading && !error && available.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {available.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} attempted={false} />
              ))}
            </div>
          )}
        </div>

        {/* ── Attempted ── */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-1.5 h-5 rounded-full bg-white/20" />
            <h2 className="text-lg font-bold text-white">Attempted</h2>
          </div>
          <p className="text-white/30 text-sm">Attempt history coming soon.</p>
        </div>
      </div>
    </div>
  );
}