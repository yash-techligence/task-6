import { useEffect, useState } from "react";
import { fetchQuizzes, fetchResults } from "../api";
import { useAuth } from "../context/useAuth";
import QuizCard from "../components/QuizCard";

export default function Dashboard() {

  const { user } = useAuth();

  const username = user?.username || user?.name || "User";

  const [available, setAvailable] = useState([]);
  const [attempted, setAttempted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const quizData = await fetchQuizzes();

        const resultData = await fetchResults();

        console.log("QUIZZES:", quizData);
        console.log("RESULTS:", resultData);

        const quizzes = Array.isArray(quizData)
          ? quizData
          : quizData.quizzes || [];

        const results = Array.isArray(resultData)
          ? resultData
          : [];

        /* FIXED ATTEMPTED QUIZ IDS */

        const attemptedQuizIds = results.map((r) =>
          Number(r.quizId || r.quiz_id)
        );

        console.log("ATTEMPTED IDS:", attemptedQuizIds);

        const availableQuizzes = quizzes.filter(
          (quiz) =>
            !attemptedQuizIds.includes(Number(quiz.id))
        );

        const attemptedQuizzes = quizzes.filter(
          (quiz) =>
            attemptedQuizIds.includes(Number(quiz.id))
        );

        setAvailable(availableQuizzes);

        setAttempted(attemptedQuizzes);

      } catch (err) {

        console.log("DASHBOARD ERROR:", err);

      } finally {

        setLoading(false);
      }
    };

    loadDashboard();

  }, []);

  return (
    <div
      className="min-h-screen p-6 md:p-10"
      style={{ background: "var(--bg)" }}
    >

      <div className="max-w-6xl mx-auto">

        {/* Welcome */}

        <div className="mb-10">

          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-2"
            style={{ color: "var(--accent)" }}
          >
            Welcome Back
          </p>

          <h1
            className="text-5xl font-extrabold"
            style={{ color: "var(--text)" }}
          >
            {username}
          </h1>

          <p
            className="mt-2"
            style={{ color: "var(--text-muted)" }}
          >
            Ready to test your knowledge today?
          </p>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

          <div
            className="rounded-2xl p-5"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="text-3xl font-bold"
              style={{ color: "var(--text)" }}
            >
              {loading ? "—" : available.length}
            </p>

            <p style={{ color: "var(--text-muted)" }}>
              Available
            </p>

          </div>

          <div
            className="rounded-2xl p-5"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="text-3xl font-bold"
              style={{ color: "var(--text)" }}
            >
              {loading ? "—" : attempted.length}
            </p>

            <p style={{ color: "var(--text-muted)" }}>
              Attempted
            </p>

          </div>

          <div
            className="rounded-2xl p-5"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="text-3xl font-bold"
              style={{ color: "var(--accent)" }}
            >
              {loading
                ? "—"
                : available.length + attempted.length}
            </p>

            <p style={{ color: "var(--text-muted)" }}>
              Total Quizzes
            </p>

          </div>

        </div>

        {/* Available Quizzes */}

        <div className="mb-10">

          <h2
            className="text-2xl font-bold mb-5"
            style={{ color: "var(--text)" }}
          >
            Available Quizzes
          </h2>

          {
            !loading && available.length === 0 && (
              <p style={{ color: "var(--text-muted)" }}>
                No quizzes available.
              </p>
            )
          }

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {available.map((quiz) => (

              <QuizCard
                key={quiz.id}
                quiz={quiz}
              />

            ))}

          </div>

        </div>

        {/* Attempted Quizzes */}

        <div>

          <h2
            className="text-2xl font-bold mb-5"
            style={{ color: "var(--text)" }}
          >
            Attempted Quizzes
          </h2>

          {
            !loading && attempted.length === 0 && (
              <p style={{ color: "var(--text-muted)" }}>
                No attempted quizzes yet.
              </p>
            )
          }

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {attempted.map((quiz) => (

              <QuizCard
                key={quiz.id}
                quiz={quiz}
                attempted={true}
              />

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}