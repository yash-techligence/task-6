import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const displayName = user?.email ? user.email.split("@")[0] : "there";

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-1 capitalize">
            Welcome back, {displayName}! 👋
          </h1>
          <p className="text-indigo-100 text-sm">
            Ready to challenge yourself today?
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Quizzes Taken", value: "—", icon: "📝" },
            { label: "Best Score", value: "—", icon: "🏆" },
            { label: "Your Rank", value: "—", icon: "📊" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center hover:border-gray-600 transition"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Start Quiz */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-indigo-500 transition group">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Start a Quiz
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Jump into a new quiz and test your knowledge against the clock.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-5 py-2 rounded-lg transition group-hover:shadow-lg group-hover:shadow-indigo-500/20">
              Play Now →
            </button>
          </div>

          {/* Leaderboard */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition group">
            <div className="text-4xl mb-3">🏅</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Leaderboard
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              See how you stack up against other players globally.
            </p>
            <button className="bg-purple-600 hover:bg-purple-500 text-white text-sm px-5 py-2 rounded-lg transition group-hover:shadow-lg group-hover:shadow-purple-500/20">
              View Rankings →
            </button>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-3">
            Account Info
          </h3>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg capitalize">
              {displayName[0]}
            </div>
            <div>
              <p className="text-white font-medium capitalize">{displayName}</p>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}