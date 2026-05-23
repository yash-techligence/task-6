const BASE_URL = "http://localhost:5000";

const getToken = () => localStorage.getItem("token");

// ─── AUTH ────────────────────────────────────────────────────────────────────

export const registerUser = async ({ name, email, password }) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!response.ok) throw new Error("Registration failed");
  return response.json(); // { success, message }
};

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Login failed");
  return response.json(); // { success, message, token }
};

// ─── QUIZZES ──────────────────────────────────────────────────────────────────

// GET /quiz
// Response: { success, quizzes: [ { id, title, description, total_questions, time_limit, questions: [...] } ] }
// Requires backend to SELECT description, total_questions, time_limit in the query
export const fetchQuizzes = async () => {
  const response = await fetch(`${BASE_URL}/quiz`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!response.ok) throw new Error("Failed to fetch quizzes");
  const data = await response.json();

  return (data.quizzes ?? []).map((quiz) => ({
    id: quiz.id,
    title: quiz.title,
    description: quiz.description ?? `${quiz.questions.length} questions`,
    totalQuestions: quiz.total_questions ?? quiz.questions.length,
    timeLimit: quiz.time_limit ?? null,
  }));
};

export const fetchQuiz = async (quizId) => {
  const response = await fetch(`${BASE_URL}/quiz/${quizId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!response.ok) throw new Error("Failed to fetch quiz");
  return response.json();
};

// ─── SUBMIT ───────────────────────────────────────────────────────────────────

// POST /submit
// Backend expects: { quiz_id, score, total_questions, time_taken }
// Backend returns: { message: "Quiz result saved successfully" }
// NOTE: score & total_questions are calculated on the frontend quiz page
export const submitQuiz = async ({
  quizId,
  score,
  totalQuestions,
  timeTaken,
}) => {
  const response = await fetch(`${BASE_URL}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      quiz_id: quizId,
      score,
      total_questions: totalQuestions,
      time_taken: timeTaken,
    }),
  });
  if (!response.ok) throw new Error("Submit failed");
  return response.json(); // { message: "Quiz result saved successfully" }
};

// ─── LEADERBOARD ──────────────────────────────────────────────────────────────

// GET /leaderboard?quiz_id=<quizId>
// Response: { leaderboard: [ { username, best_score, total_questions, time_taken }, ... ] }
export const fetchLeaderboard = async (quizId) => {
  const url = quizId
    ? `${BASE_URL}/leaderboard?quiz_id=${quizId}`
    : `${BASE_URL}/leaderboard`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!response.ok) throw new Error("Failed to fetch leaderboard");

  const data = await response.json();

  return (data.leaderboard ?? []).map((entry, index) => ({
    rank: index + 1,
    username: entry.username,
    score: entry.best_score, // backend key is best_score
    total: entry.total_questions, // backend key is total_questions
    timeTaken: entry.time_taken, // backend key is time_taken
  }));
};

// ─── RESULTS (USER HISTORY) ───────────────────────────────────────────────────

// GET /results
// Response: { success, data: [ { id, quiz_id, title, description, score, total_questions, time_taken, submitted_at } ] }
export const fetchResults = async () => {
  const response = await fetch(`${BASE_URL}/results`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!response.ok) throw new Error("Failed to fetch results");
  const data = await response.json();

  return (data.data ?? []).map((result) => ({
    id: result.id,
    quizId: result.quiz_id,
    title: result.title,
    description: result.description ?? "",
    score: result.score,
    totalQuestions: result.total_questions,
    timeTaken: result.time_taken,
    submittedAt: result.submitted_at,
  }));
};