import { useNavigate } from "react-router-dom";

export default function QuizCard({ quiz, attempted, score }) {
  const navigate = useNavigate();
  const scorePercent =
    attempted && score !== undefined
      ? Math.round((score / quiz.totalQuestions) * 100)
      : null;

  return (
    <div
      className="group relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
      style={{
        background: "var(--surface)",
        border: `1px solid ${attempted ? "var(--border)" : "var(--border)"}`,
      }}
      onMouseEnter={(e) => {
        if (!attempted)
          e.currentTarget.style.borderColor = "rgba(200,255,0,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
      }}
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
          className="text-xs font-semibold px-2.5 py-1 rounded-lg"
          style={
            attempted
              ? {
                  background: "var(--surface-hover)",
                  color: "var(--text-faint)",
                }
              : {
                  background: "var(--accent)",
                  color: "var(--bg)",
                  fontWeight: "bold",
                }
          }
        >
          {attempted ? "Attempted" : "Available"}
        </span>
        {scorePercent !== null && (
          <span
            className="text-xs font-mono"
            style={{ color: "var(--text-faint)" }}
          >
            {scorePercent}%
          </span>
        )}
      </div>

      <div className="mb-5">
        <h3
          className="font-bold text-lg leading-tight mb-1"
          style={{ color: "var(--text)" }}
        >
          {quiz.title}
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {quiz.description}
        </p>
      </div>

      {attempted && scorePercent !== null && (
        <div
          className="w-full rounded-full h-1 mb-5"
          style={{ background: "var(--surface-hover)" }}
        >
          <div
            className="h-1 rounded-full"
            style={{ width: `${scorePercent}%`, background: "var(--accent)" }}
          />
        </div>
      )}

      <div
        className="flex items-center gap-4 text-xs mb-5"
        style={{ color: "var(--text-muted)" }}
      >
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
        {quiz.timeLimit && (
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
        )}
        {attempted && score !== undefined && (
          <span className="font-semibold" style={{ color: "var(--accent)" }}>
            {score}/{quiz.totalQuestions}
          </span>
        )}
      </div>

      <button
        onClick={() =>
          attempted
            ? navigate(`/result/${quiz.id}`)
            : navigate(`/quiz/${quiz.id}`)
        }
        className="w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 active:scale-95"
        style={
          attempted
            ? {
                background: "var(--surface-hover)",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
              }
            : { background: "var(--accent)", color: "var(--bg)" }
        }
      >
        {attempted ? "View Results" : "Start Quiz →"}
      </button>
    </div>
  );
}