const db = require("../db/connection");

const submitQuiz = (req, res) => {
  const { score, total_questions, quiz_id, time_taken } = req.body;
  const user_id = req.user.id;

  if (score === undefined || !total_questions) {
    return res.status(400).json({ 
      success: false,
      message: "Score and total_questions are required" 
    });
  }

  const percentage = ((score / total_questions) * 100).toFixed(2);

  const sql =
    "INSERT INTO results (user_id, quiz_id, score, total_questions, time_taken, percentage) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [user_id, quiz_id, score, total_questions, time_taken, percentage],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ 
          success: false,
          message: "Server error" 
        });
      }
      res.status(201).json({ 
        success: true,
        message: "Quiz result saved successfully" 
      });
    }
  );
};

module.exports = { submitQuiz };