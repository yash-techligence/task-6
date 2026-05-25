const express = require("express");

const router = express.Router();

const db = require("../db/db");

router.get("/", (req, res) => {

  const { quiz_id } = req.query;

  if (!quiz_id) {
    return res.status(400).json({
      success: false,
      message: "Quiz id required",
    });
  }

  const sql = `
    SELECT
      results.id,
      results.score,
      results.time_taken AS timeTaken,
      users.name AS username
    FROM results
    JOIN users
    ON results.user_id = users.id
    WHERE results.quiz_id = ?
    ORDER BY results.score DESC, results.time_taken ASC
  `;

  db.query(sql, [quiz_id], (err, rows) => {

    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.json(rows);
  });
});

module.exports = router;