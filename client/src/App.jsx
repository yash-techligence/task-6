import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResultPage from "./pages/ResultPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/result/:quizId" element={<ResultPage />} />

        {/* Teammates will add their routes here */}
        {/* <Route path="/quiz/:quizId" element={<QuizPage />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
}