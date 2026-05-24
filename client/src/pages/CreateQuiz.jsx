import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateQuiz() {

  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const navigate = useNavigate();

  const addQuestion = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/add-question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            correctAnswer,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      setQuestion("");
      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");
      setCorrectAnswer("");

    } catch (error) {

      console.log(error);
      alert("Server Error");

    }

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

      <h1>Create Quiz Question</h1>

      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Option A"
        value={optionA}
        onChange={(e) => setOptionA(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Option B"
        value={optionB}
        onChange={(e) => setOptionB(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Option C"
        value={optionC}
        onChange={(e) => setOptionC(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Option D"
        value={optionD}
        onChange={(e) => setOptionD(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Correct Answer"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
      />

      <br /><br />

      <button onClick={addQuestion}>
        Add Question
      </button>

      <br /><br />

      <button
        onClick={() => navigate("/admin")}
      >
        Finish Quiz
      </button>

    </div>

  );

}

export default CreateQuiz;