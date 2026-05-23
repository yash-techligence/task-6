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

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) navigate("/login");
  // }, [navigate]);

  useEffect(() => {
    fetchQuizzes()
      .then(setAvailable)
      .catch(() => setError("Could not load quizzes."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="min-h-screen p-6 md:p-10"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
            >
              Q
            </div>
            <span
              className="font-bold tracking-tight"
              style={{ color: "var(--text)" }}
            >
              QuizPlatform
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={() => navigate("/quiz/create")}
                className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
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
              className="text-xs px-4 py-2 rounded-xl transition-colors duration-200"
              style={{
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#f87171";
                e.currentTarget.style.borderColor = "rgba(248,113,113,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
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
          <h1
            className="text-5xl font-extrabold leading-tight"
            style={{ color: "var(--text)" }}
          >
            {username}
          </h1>
          <p className="mt-2" style={{ color: "var(--text-muted)" }}>
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
              className="rounded-2xl p-5"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                className="text-3xl font-extrabold"
                style={{ color: stat.accent ? "var(--accent)" : "var(--text)" }}
              >
                {stat.value}
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                {stat.label}
              </p>
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
            <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>
              Available Quizzes
            </h2>
            {!loading && (
              <span className="text-sm" style={{ color: "var(--text-faint)" }}>
                {available.length}
              </span>
            )}
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 animate-pulse"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    className="h-4 rounded w-3/4 mb-3"
                    style={{ background: "var(--border)" }}
                  />
                  <div
                    className="h-3 rounded w-1/2 mb-2"
                    style={{ background: "var(--border)" }}
                  />
                  <div
                    className="h-3 rounded w-1/3"
                    style={{ background: "var(--border)" }}
                  />
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
            <p className="text-sm" style={{ color: "var(--text-faint)" }}>
              No quizzes available yet.
            </p>
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
            <span
              className="w-1.5 h-5 rounded-full"
              style={{ background: "var(--border)" }}
            />
            <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>
              Attempted
            </h2>
          </div>
          <p className="text-sm" style={{ color: "var(--text-faint)" }}>
            Attempt history coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}