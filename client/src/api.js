// const BASE_URL = "http://localhost:5000";

// const getToken = () => localStorage.getItem("token");

export const submitQuiz = async (quizId) => {
  // MOCK — remove when backend is ready
  return {
    quizId: quizId,
    score: 7,
    total: 10,
    timeTaken: 45,
  };

  // REAL — uncomment when backend is ready
  // const response = await fetch(`${BASE_URL}/submit`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${getToken()}`
  //   },
  //   body: JSON.stringify({ quizId, answers })
  // });
  // if (!response.ok) throw new Error("Submit failed");
  // return response.json();
};

// GET /leaderboard?quizId=123
export const fetchLeaderboard = async () => {
  // MOCK — remove when backend is ready
  return [
    { rank: 1, username: "Rahul", score: 10, timeTaken: 30 },
    { rank: 2, username: "Priya", score: 8, timeTaken: 35 },
    { rank: 3, username: "You", score: 7, timeTaken: 45 },
    { rank: 4, username: "Amit", score: 6, timeTaken: 50 },
    { rank: 5, username: "Sara", score: 5, timeTaken: 60 },
  ];

  // REAL — uncomment when backend is ready
  // const response = await fetch(`${BASE_URL}/leaderboard?quizId=${quizId}`, {
  //   headers: { "Authorization": `Bearer ${getToken()}` }
  // });
  // if (!response.ok) throw new Error("Failed to fetch leaderboard");
  // return response.json();
};