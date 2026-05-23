import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function Quizzes() {

  const [quizzes, setQuizzes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  async function fetchQuizzes() {

    try {

      const res = await API.get("/quiz");

      if (res.data.success) {

        setQuizzes(res.data.quizzes);

      }

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div className="min-h-screen bg-gray-950 text-white">

      <div className="max-w-5xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-10">
          Available Quizzes
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          {quizzes.map((quiz) => (

            <div
              key={quiz.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >

              <h2 className="text-2xl font-semibold mb-4">
                {quiz.title}
              </h2>

              <p className="text-gray-400 mb-6">
                Questions: {quiz.questions.length}
              </p>

              <button
                onClick={() =>
                  navigate(`/quiz/${quiz.id}`)
                }
                className="bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-lg font-semibold transition"
              >
                Start Quiz
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}