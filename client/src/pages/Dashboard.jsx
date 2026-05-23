import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizCard from "../components/QuizCard";

const MOCK_AVAILABLE = [
  {
    id: 1,
    title: "JavaScript Basics",
    description: "Variables, functions, and loops.",
    totalQuestions: 10,
    timeLimit: 60,
  },
  {
    id: 2,
    title: "React Fundamentals",
    description: "Components, props, and state.",
    totalQuestions: 10,
    timeLimit: 90,
  },
  {
    id: 3,
    title: "CSS & Tailwind",
    description: "Styling and responsive design.",
    totalQuestions: 8,
    timeLimit: 60,
  },
];

const MOCK_ATTEMPTED = [
  {
    id: 4,
    title: "HTML Essentials",
    description: "Tags, forms, and semantics.",
    totalQuestions: 10,
    timeLimit: 60,
    score: 8,
  },
  {
    id: 5,
    title: "Node.js Basics",
    description: "Modules, Express, and APIs.",
    totalQuestions: 10,
    timeLimit: 90,
    score: 6,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [available] = useState(MOCK_AVAILABLE);
  const [attempted] = useState(MOCK_ATTEMPTED);
  const username = localStorage.getItem("username") ?? "User";
  const avgScore =
    attempted.length > 0
      ? Math.round(
          attempted.reduce(
            (a, q) => a + (q.score / q.totalQuestions) * 100,
            0,
          ) / attempted.length,
        )
      : 0;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  return (
    <div className="min-h-screen p-6 md:p-10" style={{ background: "#080808" }}>
      <div className="max-w-6xl mx-auto">
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

        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            {
              label: "Available",
              value: available.length,
              color: "text-white",
            },
            {
              label: "Attempted",
              value: attempted.length,
              color: "text-white",
            },
            { label: "Avg Score", value: `${avgScore}%`, color: "" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-5"
            >
              <p
                className={`text-3xl font-extrabold ${stat.color}`}
                style={i === 2 ? { color: "var(--accent)" } : {}}
              >
                {stat.value}
              </p>
              <p className="text-white/50 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="w-1.5 h-5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            <h2 className="text-lg font-bold text-white">Available Quizzes</h2>
            <span className="text-white/20 text-sm">{available.length}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {available.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} attempted={false} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-1.5 h-5 rounded-full bg-white/20" />
            <h2 className="text-lg font-bold text-white">Attempted</h2>
            <span className="text-white/20 text-sm">{attempted.length}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {attempted.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} attempted={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}