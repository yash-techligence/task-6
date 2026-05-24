import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchLeaderboard, fetchResults } from "../api";
import { useAuth } from "../context/useAuth";
import ScoreCard from "../components/ScoreCard";
import QuizLeaderboard from "../components/QuizLeaderboard";

export default function ResultPage() {
  const { quizId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(state?.score ?? null);
  const [total, setTotal] = useState(state?.total ?? null);
  const [timeTaken, setTimeTaken] = useState(state?.timeTaken ?? null);

  const currentUser = user?.username;

  const [resultLoaded, setResultLoaded] = useState(state !== null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [leaderboardData, results] = await Promise.all([
          fetchLeaderboard(quizId),
          !resultLoaded ? fetchResults() : Promise.resolve(null),
        ]);

        setLeaderboard(leaderboardData);

        if (results !== null) {
          const match = results.find((r) => r.quizId === Number(quizId));
          if (match) {
            setScore(match.score);
            setTotal(match.totalQuestions);
            setTimeTaken(match.timeTaken);
            setResultLoaded(true);
          }
        }
      } catch {
        setError("Could not load result data.");
      } finally {
        setLoading(false);
      }
      };

    loadData();
  }, [quizId, resultLoaded]);

  return (
    <div
      className="min-h-screen p-6 md:p-10"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm transition-colors duration-200"
          style={{ color: "var(--text-faint)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-faint)")
          }
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Dashboard
        </button>

        <span
          className="text-xs font-mono tracking-widest"
          style={{ color: "var(--text-faint)" }}
        >
          QUIZ #{quizId}
        </span>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScoreCard
          score={score ?? 0}
          total={total ?? 0}
          timeTaken={timeTaken ?? 0}
          onDashboard={() => navigate("/dashboard")}
        />
        <QuizLeaderboard
          leaderboard={leaderboard}
          loading={loading}
          error={error}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}
