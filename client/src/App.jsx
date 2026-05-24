import { useState } from "react";
import "./App.css";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async () => {

    const url = isRegister
      ? "http://localhost:5000/register"
      : "http://localhost:5000/login";

    const bodyData = isRegister
      ? { name, email, password, role }
      : { email, password, role };

    try {

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (data.success) {

        alert(data.message);

        console.log(data);

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);
      alert("Server Error");

    }

  };

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
      }}
    >

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
        }}
      >

        <h1 style={{ color: "white", textAlign: "center" }}>
          Quiz Platform
        </h1>

        {isRegister && (
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleSubmit}>
          {isRegister ? "Register" : "Login"}
        </button>

        <button onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? "Already have account? Login"
            : "Create Account"}
        </button>

      </div>

    </div>

  );

}

export default App;