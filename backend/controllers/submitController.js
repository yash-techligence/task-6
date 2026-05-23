const db = require("../db/db");

const submitQuiz = (req, res) => {
  const { score, total_questions } = req.body;
  const user_id = req.user.id; // comes from JWT middleware

  if (score === undefined || !total_questions) {
    return res
      .status(400)
      .json({ message: "Score and total_questions are required" });
  }

  const sql =
    "INSERT INTO results (user_id, score, total_questions) VALUES (?, ?, ?)";

  db.query(sql, [user_id, score, total_questions], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }
    res.status(201).json({ message: "Quiz result saved successfully" });
  });
};

module.exports = { submitQuiz };
