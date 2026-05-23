import { useNavigate } from "react-router-dom";

export default function QuizCard({ quiz, attempted }) {
  const navigate = useNavigate();
  const scorePercent =
    attempted && quiz.score !== undefined
      ? Math.round((quiz.score / quiz.totalQuestions) * 100)
      : null;

  return (
    <div
      className={`group relative bg-white/[0.03] border rounded-2xl p-6 flex flex-col justify-between
      transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-0.5 overflow-hidden
      ${attempted ? "border-white/10" : "border-white/10 hover:border-[var(--accent)]/30"}`}
    >
      {!attempted && (
        <div
          className="absolute top-0 left-6 right-6 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent), transparent)",
          }}
        />
      )}

      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-lg
          ${attempted ? "bg-white/5 text-white/40" : "text-black font-bold"}`}
          style={!attempted ? { background: "var(--accent)" } : {}}
        >
          {attempted ? "Attempted" : "Available"}
        </span>
        {scorePercent !== null && (
          <span className="text-xs font-mono text-white/30">
            {scorePercent}%
          </span>
        )}
      </div>

      <div className="mb-5">
        <h3 className="text-white font-bold text-lg leading-tight mb-1">
          {quiz.title}
        </h3>
        <p className="text-white/50 text-sm">{quiz.description}</p>
      </div>

      {attempted && scorePercent !== null && (
        <div className="w-full bg-white/5 rounded-full h-1 mb-5">
          <div
            className="h-1 rounded-full"
            style={{ width: `${scorePercent}%`, background: "var(--accent)" }}
          />
        </div>
      )}

      <div className="flex items-center gap-4 text-xs text-white/45 mb-5">
        <span className="flex items-center gap-1">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {quiz.totalQuestions} questions
        </span>
        <span className="flex items-center gap-1">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {quiz.timeLimit}s
        </span>
        {attempted && quiz.score !== undefined && (
          <span className="font-semibold" style={{ color: "var(--accent)" }}>
            {quiz.score}/{quiz.totalQuestions}
          </span>
        )}
      </div>

      <button
        onClick={() => navigate(`/quiz/${quiz.id}`)}
        className={`w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 active:scale-95
          ${
            attempted
              ? "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
              : "text-black hover:opacity-90"
          }`}
        style={!attempted ? { background: "var(--accent)" } : {}}
      >
        {attempted ? "Retry" : "Start Quiz →"}
      </button>
    </div>
  );
}