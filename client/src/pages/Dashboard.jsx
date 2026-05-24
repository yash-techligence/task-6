import { useEffect, useState } from "react";
import { fetchQuizzes, fetchResults } from "../api";
import { useAuth } from "../context/useAuth";
import QuizCard from "../components/QuizCard";

export default function Dashboard() {
  const { user } = useAuth();
  const username = user?.username ?? "User";
  const [available, setAvailable] = useState([]);
  const [attempted, setAttempted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchQuizzes(), fetchResults()])
      .then(([allQuizzes, results]) => {
        // Single pass — separate into available and attempted
        const { available, attempted } = allQuizzes.reduce(
          (acc, quiz) => {
            const result = results.find((r) => r.quizId === quiz.id);
            if (result) {
              acc.attempted.push({
                ...quiz,
                resultId: result.id,
                score: result.score,
                timeTaken: result.timeTaken,
                submittedAt: result.submittedAt,
              });
            } else {
              acc.available.push(quiz);
            }
            return acc;
          },
          { available: [], attempted: [] },
        );

        setAvailable(available);
        setAttempted(attempted);
      })
      .catch(() => setError("Could not load dashboard data."))
      .finally(() => setLoading(false));
  }, []);

  const avgScore =
    attempted.length > 0
      ? Math.round(
          attempted.reduce(
            (a, r) => a + (r.score / r.totalQuestions) * 100,
            0,
          ) / attempted.length,
        )
      : null;

  return (
    <div
      className="min-h-screen p-6 md:p-10"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto">
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
            {
              label: "Attempted",
              value: loading ? "—" : attempted.length,
              accent: false,
            },
            {
              label: "Avg Score",
              value: loading ? "—" : avgScore !== null ? `${avgScore}%` : "—",
              accent: true,
            },
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

          {/* Error */}
          {!loading && error && (
            <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-5 py-4">
              {error}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && available.length === 0 && (
            <p className="text-sm" style={{ color: "var(--text-faint)" }}>
              No quizzes available yet.
            </p>
          )}

          {/* Cards */}
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
            {!loading && (
              <span className="text-sm" style={{ color: "var(--text-faint)" }}>
                {attempted.length}
              </span>
            )}
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2].map((i) => (
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

          {/* Empty */}
          {!loading && !error && attempted.length === 0 && (
            <p className="text-sm" style={{ color: "var(--text-faint)" }}>
              You haven't attempted any quizzes yet.
            </p>
          )}

          {/* Cards */}
          {!loading && !error && attempted.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {attempted.map((result) => (
                <QuizCard
                  key={result.id}
                  quiz={{
                    id: result.id,
                    title: result.title,
                    description: result.description,
                    totalQuestions: result.totalQuestions,
                    timeLimit: null,
                  }}
                  attempted={true}
                  score={result.score}
                  timeTaken={result.timeTaken}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
