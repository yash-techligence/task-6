const express = require("express");
const router = express.Router();
const db = require("../db/db");
const verifyToken = require("../middleware/authMiddleware");

/* POST /quiz/create — Create a new quiz (protected) */
router.post("/create", verifyToken, (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ success: false, message: "Title is required" });

  db.query("INSERT INTO quizzes (title) VALUES (?)", [title], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, message: "Quiz created", quiz_id: result.insertId });
  });
});

/* POST /quiz/add-question — Add a question to a quiz (protected) */
router.post("/add-question", verifyToken, (req, res) => {
  const { quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option } = req.body;

  if (!quiz_id || !question_text || !option_a || !option_b || !option_c || !option_d || !correct_option) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const sql = `INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, message: "Question added", question_id: result.insertId });
  });
});

/* GET /quiz — Fetch all quizzes with their questions (protected) */
router.get("/", verifyToken, (req, res) => {
  const sql = `
    SELECT q.id AS quiz_id, q.title,
           qn.id AS question_id, qn.question_text,
           qn.option_a, qn.option_b, qn.option_c, qn.option_d
    FROM quizzes q
    LEFT JOIN questions qn ON q.id = qn.quiz_id
    ORDER BY q.id, qn.id
  `;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    const quizzes = {};
    rows.forEach(row => {
      if (!quizzes[row.quiz_id]) {
        quizzes[row.quiz_id] = { id: row.quiz_id, title: row.title, questions: [] };
      }
      if (row.question_id) {
        quizzes[row.quiz_id].questions.push({
          id: row.question_id,
          question_text: row.question_text,
          option_a: row.option_a,
          option_b: row.option_b,
          option_c: row.option_c,
          option_d: row.option_d,
        });
      }
    });

    res.json({ success: true, quizzes: Object.values(quizzes) });
  });
});

module.exports = router;
