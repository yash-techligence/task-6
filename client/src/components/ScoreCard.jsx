export default function ScoreCard({ score, total, timeTaken, onDashboard }) {
  const percentage = Math.round((score / total) * 100);

  const getGrade = () => {
    if (percentage >= 90)
      return { label: "Outstanding", sub: "Top of the class" };
    if (percentage >= 70) return { label: "Solid Work", sub: "Above average" };
    if (percentage >= 50)
      return { label: "Decent Effort", sub: "Room to grow" };
    return { label: "Keep Grinding", sub: "You'll get there" };
  };

  const grade = getGrade();

  return (
    <div
      className="relative rounded-3xl p-8 h-full flex flex-col overflow-hidden"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
      }}
    >
      <div
        className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-5"
        style={{ background: "var(--accent)" }}
      />

      <div className="mb-8">
        <span
          className="text-xs font-semibold tracking-[0.2em] uppercase"
          style={{ color: "var(--accent)" }}
        >
          Quiz Complete
        </span>
        <h2
          className="text-4xl font-extrabold mt-1"
          style={{ color: "var(--text)" }}
        >
          {grade.label}
        </h2>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          {grade.sub}
        </p>
      </div>

      <div className="flex items-end gap-3 mb-6">
        <span
          className="text-9xl font-extrabold leading-none"
          style={{ color: "var(--text)" }}
        >
          {score}
        </span>
        <span
          className="text-4xl font-bold mb-3"
          style={{ color: "var(--text-muted)" }}
        >
          / {total}
        </span>
      </div>

      <div
        className="w-full rounded-full h-1.5 mb-8"
        style={{ background: "var(--surface)" }}
      >
        <div
          className="h-1.5 rounded-full transition-all duration-1000"
          style={{ width: `${percentage}%`, background: "var(--accent)" }}
        />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { value: `${percentage}%`, label: "Accuracy", color: "var(--text)" },
          { value: score, label: "Correct", color: "var(--accent)" },
          { value: total - score, label: "Wrong", color: "#f87171" },
        ].map((stat, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 text-center"
            style={{ background: "var(--surface)" }}
          >
            <p className="text-2xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-8">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: "var(--text-faint)" }}
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="text-sm" style={{ color: "var(--text-muted)" }}>
          {timeTaken} seconds taken
        </span>
      </div>

      <div className="mt-auto">
        <button
          onClick={onDashboard}
          className="w-full py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 active:scale-95"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--surface-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "var(--surface)")
          }
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}