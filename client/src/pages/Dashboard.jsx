import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-gray-950 text-white">

      <div className="max-w-5xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-10">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Create Quiz Card */}

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">

            <h2 className="text-2xl font-semibold mb-4">
              Create Quiz
            </h2>

            <p className="text-gray-400 mb-6">
              Create a new quiz and add questions.
            </p>

            <button
              onClick={() => navigate("/create-quiz")}
              className="bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-lg font-semibold transition"
            >
              Create Quiz
            </button>

          </div>

          {/* Available Quizzes Card */}

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">

            <h2 className="text-2xl font-semibold mb-4">
              Available Quizzes
            </h2>

            <p className="text-gray-400 mb-6">
              View and attempt available quizzes.
            </p>

            <button
              onClick={() => navigate("/quizzes")}
              className="bg-green-600 hover:bg-green-500 px-5 py-3 rounded-lg font-semibold transition"
            >
              View Quizzes
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}