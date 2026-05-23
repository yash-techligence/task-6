export default function QuizLeaderboard({ leaderboard, loading, error, currentUser }) {
  if (loading) {
    return (
      <div className="bg-black border border-white/10 rounded-3xl p-8 h-full">
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
              className="h-14 bg-white/5 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black border border-white/10 rounded-3xl p-8 h-full flex items-center justify-center">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div className="bg-black border border-white/10 rounded-3xl p-8 h-full flex items-center justify-center">
        <p className="text-white/30 text-sm">No scores yet. Be the first!</p>
      </div>
    );
  }

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="bg-black border border-white/10 rounded-3xl p-8 h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <span
          className="text-xs font-semibold tracking-[0.2em] uppercase"
          style={{ color: "var(--accent)" }}
        >
          Leaderboard
        </span>
        <h2 className="text-2xl font-extrabold text-white mt-1">Top Players</h2>
        <p className="text-white/50 text-sm mt-1">
          Ranked by score · this quiz
        </p>
      </div>

      <div className="grid grid-cols-12 gap-2 px-4 mb-2">
        <span className="col-span-1 text-white/50 text-xs uppercase tracking-widest">
          #
        </span>
        <span className="col-span-6 text-white/50 text-xs uppercase tracking-widest">
          Player
        </span>
        <span className="col-span-3 text-white/50 text-xs uppercase tracking-widest text-center">
          Score
        </span>
        <span className="col-span-2 text-white/50 text-xs uppercase tracking-widest text-right">
          Time
        </span>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto">
        {leaderboard.map((entry, index) => {
          const isCurrentUser = entry.username === currentUser;
          const isTop3 = index < 3;

          return (
            <div
              key={index}
              className={`grid grid-cols-12 gap-2 items-center px-4 py-3.5 rounded-2xl transition-all duration-200
                ${
                  isCurrentUser
                    ? "border"
                    : "bg-white/[0.03] hover:bg-white/[0.06]"
                }`}
              style={
                isCurrentUser
                  ? {
                      background: "rgba(200,255,0,0.05)",
                      borderColor: "rgba(200,255,0,0.2)",
                    }
                  : {}
              }
            >
              <span className="col-span-1 text-lg">
                {isTop3 ? (
                  medals[index]
                ) : (
                  <span className="text-white/20 font-mono text-sm">
                    {index + 1}
                  </span>
                )}
              </span>

              <div className="col-span-6 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/60">
                  {entry.username.charAt(0).toUpperCase()}
                </div>
                <span
                  className={`text-sm font-semibold truncate ${isCurrentUser ? "" : "text-white"}`}
                  style={isCurrentUser ? { color: "var(--accent)" } : {}}
                >
                  {entry.username}
                  {isCurrentUser && (
                    <span className="ml-1.5 text-xs opacity-60">(you)</span>
                  )}
                </span>
              </div>

              <div className="col-span-3 text-center">
                <span
                  className={`text-sm font-bold ${isTop3 ? "" : "text-white/90"}`}
                  style={isTop3 ? { color: "var(--accent)" } : {}}
                >
                  {entry.score}
                </span>
              </div>

              <div className="col-span-2 text-right">
                <span className="text-white/60 text-xs font-mono">
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