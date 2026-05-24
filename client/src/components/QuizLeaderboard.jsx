export default function QuizLeaderboard({
  leaderboard,
  loading,
  error,
  currentUser,
}) {
  if (loading) {
    return (
      <div
        className="rounded-3xl p-8 h-full"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border)",
        }}
      >
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
          style={{ color: "var(--accent)" }}
        >
          Leaderboard
        </p>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-14 rounded-2xl animate-pulse"
              style={{ background: "var(--surface)" }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-3xl p-8 h-full flex items-center justify-center"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border)",
        }}
      >
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div
        className="rounded-3xl p-8 h-full flex items-center justify-center"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border)",
        }}
      >
        <p className="text-sm" style={{ color: "var(--text-faint)" }}>
          No scores yet. Be the first!
        </p>
      </div>
    );
  }

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div
      className="rounded-3xl p-8 h-full flex flex-col"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="mb-6">
        <span
          className="text-xs font-semibold tracking-[0.2em] uppercase"
          style={{ color: "var(--accent)" }}
        >
          Leaderboard
        </span>
        <h2
          className="text-2xl font-extrabold mt-1"
          style={{ color: "var(--text)" }}
        >
          Top Players
        </h2>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Ranked by score · this quiz
        </p>
      </div>

      <div className="grid grid-cols-12 gap-2 px-4 mb-2">
        {["#", "Player", "Score", "Time"].map((label, i) => (
          <span
            key={i}
            className={`text-xs uppercase tracking-widest ${i === 0 ? "col-span-1" : i === 1 ? "col-span-6" : i === 2 ? "col-span-3 text-center" : "col-span-2 text-right"}`}
            style={{ color: "var(--text-muted)" }}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto">
        {leaderboard.map((entry, index) => {
          const isCurrentUser = entry.username === currentUser;
          const isTop3 = index < 3;

          return (
            <div
              key={index}
              className="grid grid-cols-12 gap-2 items-center px-4 py-3.5 rounded-2xl transition-all duration-200"
              style={
                isCurrentUser
                  ? {
                      background: "rgba(200,255,0,0.05)",
                      border: "1px solid rgba(200,255,0,0.2)",
                    }
                  : { background: "var(--surface)" }
              }
              onMouseEnter={(e) => {
                if (!isCurrentUser)
                  e.currentTarget.style.background = "var(--surface-hover)";
              }}
              onMouseLeave={(e) => {
                if (!isCurrentUser)
                  e.currentTarget.style.background = "var(--surface)";
              }}
            >
              <span className="col-span-1 text-lg">
                {isTop3 ? (
                  medals[index]
                ) : (
                  <span
                    className="font-mono text-sm"
                    style={{ color: "var(--text-faint)" }}
                  >
                    {index + 1}
                  </span>
                )}
              </span>

              <div className="col-span-6 flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "var(--surface-hover)",
                    color: "var(--text-muted)",
                  }}
                >
                  {entry.username.charAt(0).toUpperCase()}
                </div>
                <span
                  className="text-sm font-semibold truncate"
                  style={{
                    color: isCurrentUser ? "var(--accent)" : "var(--text)",
                  }}
                >
                  {entry.username}
                  {isCurrentUser && (
                    <span className="ml-1.5 text-xs opacity-60">(you)</span>
                  )}
                </span>
              </div>

              <div className="col-span-3 text-center">
                <span
                  className="text-sm font-bold"
                  style={{ color: isTop3 ? "var(--accent)" : "var(--text)" }}
                >
                  {entry.score}
                </span>
              </div>

              <div className="col-span-2 text-right">
                <span
                  className="text-xs font-mono"
                  style={{ color: "var(--text-muted)" }}
                >
                  {entry.timeTaken ?? "-"}s
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}