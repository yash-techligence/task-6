import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

export default function QuizPage() {

  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);

  const { id } = useParams();

  useEffect(() => {
    fetchQuiz();
  }, []);

  async function fetchQuiz() {
    try {

      const res = await API.get("/quiz");

      if (res.data.success) {
        const selectedQuiz = res.data.quizzes.find((q) => q.id === Number(id));
      
        setQuiz(selectedQuiz);
      }

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [timeLeft]);

  function handleOptionSelect(option) {

    setAnswers({
      ...answers,
      [currentQuestion]: option
    });

  }

  async function handleSubmit() {

    alert("Quiz Submitted");

    console.log(answers);

  }

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (!quiz) {
    return <div className="text-white p-10">No quiz found</div>;
  }
  if (!quiz.questions.length) {
  return (
    <div className="text-white p-10">
      No questions found for this quiz
    </div>
  );
  }
  const question = quiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <div className="max-w-3xl mx-auto p-6">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            {quiz.title}
          </h1>

          <div className="bg-red-600 px-4 py-2 rounded-lg font-semibold">
            {timeLeft}s
          </div>

        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">

          <h2 className="text-xl font-semibold mb-6">
            Q{currentQuestion + 1}. {question.question_text}
          </h2>

          <div className="space-y-4">

            {["a", "b", "c", "d"].map((key) => (

              <button
                key={key}
                onClick={() =>
                  handleOptionSelect(key)
                }
                className={`w-full text-left p-4 rounded-xl border transition
                ${
                  answers[currentQuestion] === key
                    ? "bg-indigo-600 border-indigo-500"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                }`}
              >

                {question[`option_${key}`]}

              </button>

            ))}

          </div>

          <div className="flex justify-between mt-8">

            <button
              disabled={currentQuestion === 0}
              onClick={() =>
                setCurrentQuestion(currentQuestion - 1)
              }
              className="bg-gray-700 px-5 py-2 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            {currentQuestion < quiz.questions.length - 1 ? (

              <button
                onClick={() =>
                  setCurrentQuestion(currentQuestion + 1)
                }
                className="bg-indigo-600 px-5 py-2 rounded-lg"
              >
                Next
              </button>

            ) : (

              <button
                onClick={handleSubmit}
                className="bg-green-600 px-5 py-2 rounded-lg"
              >
                Submit Quiz
              </button>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}