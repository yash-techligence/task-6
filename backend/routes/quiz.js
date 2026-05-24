const express = require("express");
const router = express.Router();
const db = require("../db/db");
const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

/* CREATE QUIZ */

router.post("/create", verifyToken, adminMiddleware, (req, res) => {

  const { title, description, total_questions, time_limit } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required"
    });
  }

  const sql =
    "INSERT INTO quizzes (title, description, total_questions, time_limit) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [title, description || null, total_questions || 0, time_limit || 60],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      res.json({
        success: true,
        message: "Quiz created",
        quiz_id: result.insertId
      });

    }
  );

});

/* ADD QUESTION */

router.post("/add-question", verifyToken, adminMiddleware, (req, res) => {

  const {
    quiz_id,
    question,
    option1,
    option2,
    option3,
    option4,
    answer
  } = req.body;

  if (
    !quiz_id ||
    !question ||
    !option1 ||
    !option2 ||
    !option3 ||
    !option4 ||
    !answer
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  const validAnswers = ['a', 'b', 'c', 'd'];

  if (!validAnswers.includes(answer)) {
    return res.status(400).json({
      success: false,
      message: "answer must be a, b, c, or d"
    });
  }

  const sql = `
    INSERT INTO questions
    (
      quiz_id,
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      quiz_id,
      question,
      option1,
      option2,
      option3,
      option4,
      answer
    ],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      // Update total_questions count in quizzes table
      db.query(
        "UPDATE quizzes SET total_questions = total_questions + 1 WHERE id = ?",
        [quiz_id],
        (updateErr) => {
          if (updateErr) {
            console.error("Failed to update total_questions:", updateErr.message);
          }
        }
      );

      res.json({
        success: true,
        message: "Question added successfully",
        question_id: result.insertId
      });

    }
  );

});

/* GET ALL QUIZZES WITH QUESTIONS */

router.get("/", verifyToken, (req, res) => {

  const sql = `
    SELECT
      q.id AS quiz_id,
      q.title,
      q.description,
      q.total_questions,
      q.time_limit,
      qs.id AS question_id,
      qs.question,
      qs.option_a,
      qs.option_b,
      qs.option_c,
      qs.option_d
    FROM quizzes q
    LEFT JOIN questions qs
    ON q.id = qs.quiz_id
    ORDER BY q.id, qs.id
  `;

  db.query(sql, (err, rows) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    const quizzes = {};

    rows.forEach((row) => {

      if (!quizzes[row.quiz_id]) {
        quizzes[row.quiz_id] = {
          id: row.quiz_id,
          title: row.title,
          description: row.description,
          total_questions: row.total_questions,
          time_limit: row.time_limit,
          questions: []
        };
      }

      if (row.question_id) {
        quizzes[row.quiz_id].questions.push({
          id: row.question_id,
          question: row.question,
          option1: row.option_a,
          option2: row.option_b,
          option3: row.option_c,
          option4: row.option_d
        });
      }

    });

    res.json({
      success: true,
      quizzes: Object.values(quizzes)
    });

  });

});

/* GET SINGLE QUIZ BY ID */

router.get("/:id", verifyToken, (req, res) => {

  const quiz_id = req.params.id;

  const sql = `
    SELECT
      q.id AS quiz_id,
      q.title,
      q.description,
      q.total_questions,
      q.time_limit,
      qs.id AS question_id,
      qs.question,
      qs.option_a,
      qs.option_b,
      qs.option_c,
      qs.option_d
    FROM quizzes q
    LEFT JOIN questions qs
    ON q.id = qs.quiz_id
    WHERE q.id = ?
    ORDER BY qs.id
  `;

  db.query(sql, [quiz_id], (err, rows) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found"
      });
    }

    const quiz = {
      id: rows[0].quiz_id,
      title: rows[0].title,
      description: rows[0].description,
      total_questions: rows[0].total_questions,
      time_limit: rows[0].time_limit,
      questions: []
    };

    rows.forEach((row) => {
      if (row.question_id) {
        quiz.questions.push({
          id: row.question_id,
          question: row.question,
          option1: row.option_a,
          option2: row.option_b,
          option3: row.option_c,
          option4: row.option_d
        });
      }
    });

    res.json({
      success: true,
      quiz
    });

  });

});

module.exports = router;