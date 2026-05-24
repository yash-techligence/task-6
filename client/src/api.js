const BASE_URL = "http://localhost:5000";

const getToken = () => localStorage.getItem("token");

export const registerUser = async ({ username, email, password }) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return response.json();
};

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const fetchQuizzes = async () => {
  const response = await fetch(`${BASE_URL}/quiz`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch quizzes");
  }
  const data = await response.json();

  return (data.quizzes ?? []).map((quiz) => ({
    id: quiz.id,
    title: quiz.title,
    description: quiz.description ?? `${quiz.questions?.length ?? 0} questions`,
    totalQuestions: quiz.total_questions ?? quiz.questions?.length ?? 0,
    timeLimit: quiz.time_limit ?? null,
    questions: (quiz.questions ?? []).map((q) => ({
      id: q.id,
      question: q.question,
      option_a: q.option1,
      option_b: q.option2,
      option_c: q.option3,
      option_d: q.option4,
      correct_answer: q.correct_option,
    })),
  }));
};

export const fetchQuiz = async (quizId) => {
  const response = await fetch(`${BASE_URL}/quiz`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch quiz");
  }
  const data = await response.json();
  const quizzes = (data.quizzes ?? []).map((quiz) => ({
    id: quiz.id,
    title: quiz.title,
    description: quiz.description ?? "",
    totalQuestions: quiz.total_questions ?? quiz.questions?.length ?? 0,
    timeLimit: quiz.time_limit ?? null,
    questions: (quiz.questions ?? []).map((q) => ({
      id: q.id,
      question: q.question,
      option_a: q.option1,
      option_b: q.option2,
      option_c: q.option3,
      option_d: q.option4,
      correct_answer: q.correct_option,
    })),
  }));
  const found = quizzes.find((q) => q.id === Number(quizId));
  if (!found) throw new Error("Quiz not found");
  return found;
};

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
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Submit failed");
  }
  return response.json();
};

export const fetchLeaderboard = async (quizId) => {
  const url = quizId
    ? `${BASE_URL}/leaderboard?quiz_id=${quizId}`
    : `${BASE_URL}/leaderboard`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch leaderboard");
  }

  const data = await response.json();

  return (data.leaderboard ?? []).map((entry, index) => ({
    rank: index + 1,
    username: entry.username,
    score: entry.best_score,
    total: entry.total_questions,
    timeTaken: entry.time_taken,
  }));
};

export const fetchResults = async () => {
  const response = await fetch(`${BASE_URL}/results`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch results");
  }
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