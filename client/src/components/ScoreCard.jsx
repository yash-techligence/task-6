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
    <div className="relative bg-black border border-white/10 rounded-3xl p-8 h-full flex flex-col overflow-hidden">
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
        <h2 className="text-4xl font-extrabold text-white mt-1">
          {grade.label}
        </h2>
        <p className="text-white/60 text-sm mt-1">{grade.sub}</p>
      </div>

      <div className="flex items-end gap-3 mb-6">
        <span className="text-9xl font-extrabold leading-none text-white">
          {score}
        </span>
        <span className="text-4xl font-bold text-white/60 mb-3">/ {total}</span>
      </div>

      <div className="w-full bg-white/5 rounded-full h-1.5 mb-8">
        <div
          className="h-1.5 rounded-full transition-all duration-1000"
          style={{ width: `${percentage}%`, background: "var(--accent)" }}
        />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-white/5 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{percentage}%</p>
          <p className="text-white/60 text-xs mt-1">Accuracy</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
            {score}
          </p>
          <p className="text-white/60 text-xs mt-1">Correct</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-red-400">{total - score}</p>
          <p className="text-white/60 text-xs mt-1">Wrong</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-8">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-white/30"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="text-white/40 text-sm">{timeTaken} seconds taken</span>
      </div>

      <div className="mt-auto">
        <button
          onClick={onDashboard}
          className="w-full py-3.5 rounded-2xl font-bold text-white text-sm tracking-wide bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 active:scale-95"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}