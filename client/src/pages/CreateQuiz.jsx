import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

export default function CreateQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [quizId, setQuizId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionData, setQuestionData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "a",
  });
  const [loading, setLoading] = useState(false);

  async function createQuiz() {
    if (!title.trim()) {
      alert("Please enter quiz title");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/quiz/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      if (data.success) {
        setQuizId(data.quiz_id);
        alert("Quiz Created Successfully");
      } else {
        alert(data.message || "Failed to create quiz");
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
      !questionData.option1 ||
      !questionData.option2 ||
      !questionData.option3 ||
      !questionData.option4
    ) {
      alert("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/quiz/add-question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ quiz_id: quizId, ...questionData }),
      });
      const data = await res.json();
      if (data.success) {
        setQuestions([...questions, questionData]);
        alert("Question Added Successfully");
        setQuestionData({
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "a",
        });
      } else {
        alert(data.message || "Failed to add question");
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

  const inputStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    color: "var(--text)",
  };

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div
          className="rounded-2xl p-8"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <h1
            className="text-3xl font-bold mb-6"
            style={{ color: "var(--text)" }}
          >
            Create Quiz
          </h1>

          {!quizId ? (
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Quiz Title
                </label>
                <input
                  type="text"
                  placeholder="Enter quiz title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none transition"
                  style={inputStyle}
                />
              </div>
              <button
                onClick={createQuiz}
                disabled={loading}
                className="font-semibold rounded-xl px-5 py-2.5 text-sm transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
              >
                {loading ? "Creating..." : "Create Quiz"}
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-2xl font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  Add Questions
                </h2>
                <span
                  className="px-4 py-2 rounded-lg text-sm"
                  style={{
                    background: "var(--surface)",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border)",
                  }}
                >
                  Questions Added: {questions.length}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Question
                  </label>
                  <textarea
                    placeholder="Enter question"
                    value={questionData.question}
                    onChange={(e) =>
                      setQuestionData({
                        ...questionData,
                        question: e.target.value,
                      })
                    }
                    className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none transition"
                    style={inputStyle}
                  />
                </div>

                {[1, 2, 3, 4].map((num) => (
                  <div key={num}>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Option {num}
                    </label>
                    <input
                      type="text"
                      placeholder={`Option ${num}`}
                      value={questionData[`option${num}`]}
                      onChange={(e) =>
                        setQuestionData({
                          ...questionData,
                          [`option${num}`]: e.target.value,
                        })
                      }
                      className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none transition"
                      style={inputStyle}
                    />
                  </div>
                ))}

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Select Correct Answer
                  </label>
                  <select
                    value={questionData.answer}
                    onChange={(e) =>
                      setQuestionData({
                        ...questionData,
                        answer: e.target.value,
                      })
                    }
                    className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none transition"
                    style={inputStyle}
                  >
                    <option value="a">Option 1</option>
                    <option value="b">Option 2</option>
                    <option value="c">Option 3</option>
                    <option value="d">Option 4</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={addQuestion}
                    disabled={loading}
                    className="font-semibold rounded-xl px-5 py-2.5 text-sm transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50"
                    style={{ background: "var(--accent)", color: "var(--bg)" }}
                  >
                    {loading ? "Adding..." : "Add Question"}
                  </button>
                  <button
                    onClick={finishQuiz}
                    className="font-semibold rounded-xl px-5 py-2.5 text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{
                      background: "var(--surface)",
                      color: "var(--text)",
                      border: "1px solid var(--border)",
                    }}
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