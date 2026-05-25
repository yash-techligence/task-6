const db = require("../db/db");

const getResults = (req, res) => {

  const sql = `
    SELECT
      id,
      quiz_id AS quizId,
      score,
      total_questions AS totalQuestions,
      time_taken AS timeTaken
    FROM results
    ORDER BY id DESC
  `;

  db.query(sql, (err, rows) => {

    if (err) {

      console.log(err);

      return res.status(500).json({
        success: false,
        message: err.message,
      });

    }

    res.json(rows);

  });

};

module.exports = {
  getResults,
};