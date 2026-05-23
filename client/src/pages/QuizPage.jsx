import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuizzes, submitQuiz } from "../api";

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    fetchQuizzes()
      .then((quizzes) => {
        const found = quizzes.find((q) => q.id === Number(id));
        setQuiz(found ?? null);
        if (found?.timeLimit) setTimeLeft(found.timeLimit);
      })
      .catch(() => setQuiz(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) {
      if (timeLeft === 0) handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  async function handleSubmit() {
    if (submitting || !quiz) return;
    setSubmitting(true);

    const timeTaken = Math.round((Date.now() - startTime) / 1000);

    const allQuestions = quiz.questions ?? [];
    const score = allQuestions.reduce((acc, q, i) => {
      return answers[i] === q.correct_answer ? acc + 1 : acc;
    }, 0);

    try {
      await submitQuiz({
        quizId: quiz.id,
        score,
        totalQuestions: allQuestions.length,
        timeTaken,
      });
    } catch {
      console.error("Failed to save result");
    }

    navigate(`/result/${quiz.id}`, {
      state: { score, total: allQuestions.length, timeTaken },
    });
  }

  function handleOptionSelect(option) {
    setAnswers({ ...answers, [currentQuestion]: option });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <p style={{ color: "var(--text-muted)" }}>Loading quiz...</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <p style={{ color: "var(--text-muted)" }}>Quiz not found.</p>
      </div>
    );
  }

  if (!quiz.questions?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <p style={{ color: "var(--text-muted)" }}>No questions found for this quiz.</p>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const isLast = currentQuestion === quiz.questions.length - 1;
  const timerWarning = timeLeft !== null && timeLeft <= 10;

  return (
    <div className="min-h-screen p-6 md:p-10" style={{ background: "var(--bg)" }}>
      <div className="max-w-3xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-extrabold" style={{ color: "var(--text)" }}>
              {quiz.title}
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Question {currentQuestion + 1} of {quiz.questions.length}
            </p>
          </div>

          {timeLeft !== null && (
            <div
              className="px-4 py-2 rounded-xl font-bold font-mono text-sm"
              style={{
                background: timerWarning ? "rgba(239,68,68,0.15)" : "var(--surface)",
                border: `1px solid ${timerWarning ? "rgba(239,68,68,0.4)" : "var(--border)"}`,
                color: timerWarning ? "#f87171" : "var(--text)",
              }}
            >
              {timeLeft}s
            </div>
          )}
        </div>

        <div
          className="rounded-2xl p-6 mb-4"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <h2 className="text-lg font-semibold mb-6" style={{ color: "var(--text)" }}>
            {currentQuestion + 1}. {question.question_text}
          </h2>

          <div className="space-y-3">
            {["a", "b", "c", "d"].map((key) => {
              const selected = answers[currentQuestion] === key;
              return (
                <button
                  key={key}
                  onClick={() => handleOptionSelect(key)}
                  className="w-full text-left p-4 rounded-xl transition-all duration-200"
                  style={{
                    background: selected ? "rgba(200,255,0,0.1)" : "var(--surface-hover)",
                    border: `1px solid ${selected ? "var(--accent)" : "var(--border)"}`,
                    color: selected ? "var(--accent)" : "var(--text)",
                  }}
                >
                  <span className="font-semibold uppercase mr-3">{key}.</span>
                  {question[`option_${key}`]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-30"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
          >
            Previous
          </button>

          {isLast ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}