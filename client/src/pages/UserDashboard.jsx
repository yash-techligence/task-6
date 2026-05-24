import { useNavigate } from "react-router-dom";

function UserDashboard() {

  const navigate = useNavigate();

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
      }}
    >

      <h1>User Dashboard</h1>

      <button
        onClick={() => navigate("/quiz")}
      >
        Start Quiz
      </button>

    </div>

  );

}

export default UserDashboard;