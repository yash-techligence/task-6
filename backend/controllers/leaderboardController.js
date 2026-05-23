const db = require("../db/db");

const getLeaderboard = (req, res) => {
  const sql = `
    SELECT 
      users.name,       
      MAX(results.score) AS best_score,
      results.total_questions,
      MAX(results.submitted_at) AS submitted_at
    FROM results
    JOIN users ON results.user_id = users.id
    GROUP BY results.user_id, users.name, results.total_questions
    ORDER BY best_score DESC
    LIMIT 10
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }
    res.status(200).json({ leaderboard: rows });
  });
};

module.exports = { getLeaderboard };
