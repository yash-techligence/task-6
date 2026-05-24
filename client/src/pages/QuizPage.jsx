import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuiz, submitQuiz } from "../api";
export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  // overall quiz timer in seconds
  const [timeLeft, setTimeLeft] = useState(null);
  const startTime = useRef(null);
  const submittingRef = useRef(false);
  const quizRef = useRef(null);
  const answersRef = useRef({});
  /* START TIMER */
  useEffect(() => {
    startTime.current = Date.now();
  }, []);
  /* FETCH QUIZ */
  useEffect(() => {
    fetchQuiz(id)
      .then((q) => {
        setQuiz(q);
        quizRef.current = q;
        // convert minutes -> seconds
        if (q?.timeLimit) {
          setTimeLeft(q.timeLimit * 60);
        }
      })
      .catch(() => setQuiz(null))
      .finally(() => setLoading(false));
  }, [id]);
  /* KEEP ANSWERS UPDATED */
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);
  /* SUBMIT QUIZ */
  const handleSubmit = useCallback(async () => {
    if (submittingRef.current || !quizRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);
    const timeTaken = Math.round((Date.now() - startTime.current) / 1000);
    const allQuestions = quizRef.current.questions ?? [];
    const score = allQuestions.reduce((acc, q, i) => {
      return answersRef.current[i] === q.correct_answer ? acc + 1 : acc;
    }, 0);
    try {
      await submitQuiz({
        quizId: quizRef.current.id,
        score,
        totalQuestions: allQuestions.length,
        timeTaken,
      });
    } catch {
      console.error("Failed to save result");
    }
    navigate(`/result/${quizRef.current.id}`, {
      state: {
        score,
        total: allQuestions.length,
        timeTaken,
      },
    });
  }, [navigate]);
  /* OVERALL QUIZ TIMER */
  const timerReady = timeLeft !== null;

  useEffect(() => {
    if (timeLeft === null) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerReady, handleSubmit]);
  /* SELECT OPTION */
  function handleOptionSelect(option) {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
  }
  /* LOADING */
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg)" }}
      >
        <p style={{ color: "var(--text-muted)" }}>Loading quiz...</p>
      </div>
    );
  }
  /* QUIZ NOT FOUND */
  if (!quiz) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg)" }}
      >
        <p style={{ color: "var(--text-muted)" }}>Quiz not found.</p>
      </div>
    );
  }
  /* NO QUESTIONS */
  if (!quiz.questions?.length) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg)" }}
      >
        <p style={{ color: "var(--text-muted)" }}>
          No questions found for this quiz.
        </p>
      </div>
    );
  }
  const question = quiz.questions[currentQuestion];
  const isLast = currentQuestion === quiz.questions.length - 1;
  const timerWarning = timeLeft !== null && timeLeft <= 60;
  return (
    <div
      className="min-h-screen p-6 md:p-10"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1
              className="text-2xl font-extrabold"
              style={{ color: "var(--text)" }}
            >
              {quiz.title}
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Question {currentQuestion + 1} of {quiz.questions.length}
            </p>
          </div>
          {/* TIMER */}
          {timeLeft !== null && (
            <div
              className="px-4 py-2 rounded-xl font-bold font-mono text-sm"
              style={{
                background: timerWarning
                  ? "rgba(239,68,68,0.15)"
                  : "var(--surface)",
                border: `1px solid ${
                  timerWarning ? "rgba(239,68,68,0.4)" : "var(--border)"
                }`,
                color: timerWarning ? "#f87171" : "var(--text)",
              }}
            >
              {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </div>
          )}
        </div>
        {/* QUESTION CARD */}
        <div
          className="rounded-2xl p-6 mb-4"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <h2
            className="text-lg font-semibold mb-6"
            style={{ color: "var(--text)" }}
          >
            {currentQuestion + 1}. {question.question}
          </h2>
          <div className="space-y-3">
            {["a", "b", "c", "d"].map((key) => {
              const selected = answers[currentQuestion] === key;
              return (
                <button
                  key={key}
                  onClick={() => handleOptionSelect(key)}
                  className="w-full text-left p-4 rounded-xl transition-all
duration-200"
                  style={{
                    background: selected
                      ? "rgba(200,255,0,0.1)"
                      : "var(--surface-hover)",
                    border: `1px solid ${
                      selected ? "var(--accent)" : "var(--border)"
                    }`,
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
        {/* BUTTONS */}
        <div className="flex justify-between mt-6">
          {/* PREVIOUS */}
          <button
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm transitionall
duration-200 disabled:opacity-30"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          >
            Previous
          </button>
          {/* NEXT / SUBMIT */}
          {isLast ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm transitionall
duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50"
              style={{
                background: "var(--accent)",
                color: "var(--bg)",
              }}
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm transitionall
duration-200 hover:opacity-90 active:scale-95"
              style={{
                background: "var(--accent)",
                color: "var(--bg)",
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
