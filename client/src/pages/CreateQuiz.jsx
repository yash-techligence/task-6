import { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";


export default function CreateQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const [quizId, setQuizId] = useState(null);

  const [questions, setQuestions] = useState([]);

  const [questionData, setQuestionData] = useState({
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_answer: "a"
  });

  const [loading, setLoading] = useState(false);

  async function createQuiz() {

    if (!title.trim()) {
      alert("Please enter quiz title");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post("/quiz/create", {
        title
      });

      if (res.data.success) {

        setQuizId(res.data.quiz_id);

        alert("Quiz Created Successfully");

      }

    } catch (err) {

      console.log(err);

      alert("Failed to create quiz");

    } finally {

      setLoading(false);

    }

  }

  async function addQuestion() {

    if (
      !questionData.question ||
      !questionData.option_a ||
      !questionData.option_b ||
      !questionData.option_c ||
      !questionData.option_d
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post("/quiz/add-question", {
        quiz_id: quizId,
        ...questionData
      });

      if (res.data.success) {

        setQuestions([...questions, questionData]);

        alert("Question Added Successfully");

        setQuestionData({
          question: "",
          option_a: "",
          option_b: "",
          option_c: "",
          option_d: "",
          correct_answer: "a"
        });

      }

    } catch (err) {

      console.log(err);

      alert("Failed to add question");

    } finally {

      setLoading(false);

    }

  }

  function finishQuiz() {
  alert(`Quiz created successfully with ${questions.length} questions`);
  navigate("/dashboard");

  }

  return (

    <div className="min-h-screen bg-gray-950 text-white">

      <div className="max-w-3xl mx-auto p-6">

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">

          <h1 className="text-3xl font-bold mb-6">
            Create Quiz
          </h1>

          {!quizId ? (

            <div className="space-y-4">

              <div>

                <label className="block text-sm text-gray-300 mb-2">
                  Quiz Title
                </label>

                <input
                  type="text"
                  placeholder="Enter quiz title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-indigo-500"
                />

              </div>

              <button
                onClick={createQuiz}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-lg font-semibold transition"
              >
                {loading ? "Creating..." : "Create Quiz"}
              </button>

            </div>

          ) : (

            <div>

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-semibold">
                  Add Questions
                </h2>

                <span className="bg-gray-800 px-4 py-2 rounded-lg text-sm">
                  Questions Added: {questions.length}
                </span>

              </div>

              <div className="space-y-4">

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    Question
                  </label>

                  <textarea
                    placeholder="Enter question"
                    value={questionData.question}
                    onChange={(e) =>
                      setQuestionData({
                        ...questionData,
                        question: e.target.value
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-indigo-500"
                  />

                </div>

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    Option A
                  </label>

                  <input
                    type="text"
                    placeholder="Option A"
                    value={questionData.option_a}
                    onChange={(e) =>
                      setQuestionData({
                        ...questionData,
                        option_a: e.target.value
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-indigo-500"
                  />

                </div>

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    Option B
                  </label>

                  <input
                    type="text"
                    placeholder="Option B"
                    value={questionData.option_b}
                    onChange={(e) =>
                      setQuestionData({
                        ...questionData,
                        option_b: e.target.value
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-indigo-500"
                  />

                </div>

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    Option C
                  </label>

                  <input
                    type="text"
                    placeholder="Option C"
                    value={questionData.option_c}
                    onChange={(e) =>
                      setQuestionData({
                        ...questionData,
                        option_c: e.target.value
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-indigo-500"
                  />

                </div>

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    Option D
                  </label>

                  <input
                    type="text"
                    placeholder="Option D"
                    value={questionData.option_d}
                    onChange={(e) =>
                      setQuestionData({
                        ...questionData,
                        option_d: e.target.value
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-indigo-500"
                  />

                </div>

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    Select Correct Answer
                  </label>

                  <select
                    value={questionData.correct_answer}
                    onChange={(e) =>
                      setQuestionData({
                        ...questionData,
                        correct_answer: e.target.value
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="a">Option A</option>
                    <option value="b">Option B</option>
                    <option value="c">Option C</option>
                    <option value="d">Option D</option>
                  </select>

                </div>

                <div className="flex gap-4 pt-4">

                  <button
                    onClick={addQuestion}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-500 px-5 py-3 rounded-lg font-semibold transition"
                  >
                    {loading ? "Adding..." : "Add Question"}
                  </button>

                  <button
                    onClick={finishQuiz}
                    className="bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-lg font-semibold transition"
                  >
                    Finish Quiz
                  </button>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}