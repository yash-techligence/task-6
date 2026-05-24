import { useNavigate } from "react-router-dom";

function AdminDashboard() {

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

      <h1>Admin Dashboard</h1>

      <button
        onClick={() => navigate("/create-quiz")}
      >
        Create Quiz
      </button>

    </div>

  );

}

export default AdminDashboard;