import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import CreateQuiz from "./pages/CreateQuiz";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/user"
          element={<UserDashboard />}
        />

        <Route
          path="/create-quiz"
          element={<CreateQuiz />}
        />

        <Route
          path="/quiz"
          element={<QuizPage />}
       />

        <Route
          path="/result"
          element={<ResultPage />}
       />

      </Routes>

    </BrowserRouter>

  );

}

export default App;