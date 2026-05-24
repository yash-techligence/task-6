const db = require("../db/db");

const getResults = (req, res) => {
  const userId = req.user.id;

  const sql = `
  SELECT 
    r.id,
    r.quiz_id,
    r.score,
    r.total_questions,
    r.time_taken,
    r.submitted_at,
    q.title,
    q.description
  FROM results r
  JOIN quizzes q ON r.quiz_id = q.id
  WHERE r.user_id = ?
  ORDER BY r.id DESC
`;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Error fetching results",
      });
    }

    res.json({
      success: true,
      data: result,
    });
  });
};

module.exports = {
  getResults,
};
