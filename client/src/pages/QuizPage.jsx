import { useEffect, useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function QuizPage() {

  const navigate = useNavigate();
  const location = useLocation();

  const userName =
    location.state?.name || "User";

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {

    fetchQuestions();

  }, []);

  const fetchQuestions = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/questions"
      );

      const data = await response.json();

      if (data.success) {

        setQuestions(data.questions);

      }

    } catch (error) {

      console.log(error);

    }

  };

  const selectOption = (questionId, option) => {

    setAnswers({
      ...answers,
      [questionId]: option,
    });

  };

  const submitQuiz = () => {

    let totalScore = 0;

    questions.forEach((q) => {

      if (answers[q.id] === q.correctAnswer) {

        totalScore++;

      }

    });

    navigate("/result", {
      state: {
        score: totalScore,
        total: questions.length,
        name: userName,
      },
    });

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
      }}
    >

      <h1 style={{ textAlign: "center" }}>
        Quiz Started
      </h1>

      {questions.map((q) => (

        <div
          key={q.id}
          style={{
            border: "1px solid white",
            padding: "20px",
            marginBottom: "20px",
          }}
        >

          <h2>{q.question}</h2>

          <button
            onClick={() =>
              selectOption(q.id, q.optionA)
            }
            style={{
              background:
                answers[q.id] === q.optionA
                  ? "green"
                  : "white",

              color:
                answers[q.id] === q.optionA
                  ? "white"
                  : "black",

              margin: "10px",
              padding: "10px",
            }}
          >
            {q.optionA}
          </button>

          <br />

          <button
            onClick={() =>
              selectOption(q.id, q.optionB)
            }
            style={{
              background:
                answers[q.id] === q.optionB
                  ? "green"
                  : "white",

              color:
                answers[q.id] === q.optionB
                  ? "white"
                  : "black",

              margin: "10px",
              padding: "10px",
            }}
          >
            {q.optionB}
          </button>

          <br />

          <button
            onClick={() =>
              selectOption(q.id, q.optionC)
            }
            style={{
              background:
                answers[q.id] === q.optionC
                  ? "green"
                  : "white",

              color:
                answers[q.id] === q.optionC
                  ? "white"
                  : "black",

              margin: "10px",
              padding: "10px",
            }}
          >
            {q.optionC}
          </button>

          <br />

          <button
            onClick={() =>
              selectOption(q.id, q.optionD)
            }
            style={{
              background:
                answers[q.id] === q.optionD
                  ? "green"
                  : "white",

              color:
                answers[q.id] === q.optionD
                  ? "white"
                  : "black",

              margin: "10px",
              padding: "10px",
            }}
          >
            {q.optionD}
          </button>

        </div>

      ))}

      <button
        onClick={submitQuiz}
        style={{
          padding: "10px 20px",
          fontSize: "18px",
        }}
      >
        Submit Quiz
      </button>

    </div>

  );

}

export default QuizPage;