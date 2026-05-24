const db = require("../db/db");

const getLeaderboard = (req, res) => {
  const { quiz_id } = req.query;

  let sql;
  let params;

  if (quiz_id) {
    sql = `
      SELECT 
        users.username,
        MAX(results.score) AS best_score,
        results.total_questions,
        results.time_taken
      FROM results
      JOIN users ON results.user_id = users.id
      WHERE results.quiz_id = ?
      GROUP BY results.user_id, users.username, results.total_questions, results.time_taken
      ORDER BY best_score DESC
      LIMIT 10
    `;
    params = [quiz_id];
  } else {
    sql = `
      SELECT 
        users.username,
        MAX(results.score) AS best_score,
        results.total_questions,
        results.time_taken
      FROM results
      JOIN users ON results.user_id = users.id
      GROUP BY results.user_id, users.username, results.total_questions, results.time_taken
      ORDER BY best_score DESC
      LIMIT 10
    `;
    params = [];
  }

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }
    res.status(200).json({ leaderboard: rows });
  });
};

module.exports = { getLeaderboard };