import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuizzes } from "../api";

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes()
      .then(setQuizzes)
      .catch(() => setError("Could not load quizzes."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="min-h-screen p-6 md:p-10"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-5xl mx-auto">
        <h1
          className="text-4xl font-extrabold mb-10"
          style={{ color: "var(--text)" }}
        >
          Available Quizzes
        </h1>

        {loading && (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl p-6 animate-pulse"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="h-5 rounded w-3/4 mb-4"
                  style={{ background: "var(--border)" }}
                />
                <div
                  className="h-3 rounded w-1/3 mb-6"
                  style={{ background: "var(--border)" }}
                />
                <div
                  className="h-10 rounded-xl w-1/3"
                  style={{ background: "var(--border)" }}
                />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-5 py-4">
            {error}
          </div>
        )}

        {!loading && !error && quizzes.length === 0 && (
          <p className="text-sm" style={{ color: "var(--text-faint)" }}>
            No quizzes available yet.
          </p>
        )}

        {!loading && !error && quizzes.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="rounded-2xl p-6"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <h2
                  className="text-2xl font-semibold mb-2"
                  style={{ color: "var(--text)" }}
                >
                  {quiz.title}
                </h2>
                <p
                  className="text-sm mb-6"
                  style={{ color: "var(--text-muted)" }}
                >
                  {quiz.totalQuestions} questions
                </p>
                <button
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{ background: "var(--accent)", color: "var(--bg)" }}
                >
                  Start Quiz
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}