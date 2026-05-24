import { useLocation } from "react-router-dom";

function ResultPage() {

  const location = useLocation();

  const {
    score,
    total,
    name,
  } = location.state || {
    score: 0,
    total: 0,
    name: "User",
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
        textAlign: "center",
      }}
    >

      <h1>Quiz Result</h1>

      <h2>
        Your Score: {score} / {total}
      </h2>

      <h3>
        Percentage:
        {" "}
        {total > 0
          ? ((score / total) * 100).toFixed(0)
          : 0}%
      </h3>

      <h2 style={{ marginTop: "40px" }}>
        Leaderboard
      </h2>

      <div
        style={{
          border: "1px solid white",
          padding: "20px",
          width: "300px",
          margin: "auto",
          marginTop: "20px",
          borderRadius: "10px",
        }}
      >

        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          1. {name} - {score}
        </p>

      </div>

    </div>

  );

}

export default ResultPage;