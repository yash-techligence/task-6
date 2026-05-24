const express = require("express");
const router = express.Router();
const db = require("../db/db");
const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

/* CREATE QUIZ */

router.post("/create", verifyToken, adminMiddleware, (req, res) => {

  const { title } = req.body;

  if (!title) {

    return res.status(400).json({
      success: false,
      message: "Title is required"
    });

  }

  const sql =
    "INSERT INTO quizzes (title) VALUES (?)";

  db.query(
    sql,
    [title],
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

router.post("/add-question", verifyToken, adminMiddleware,  (req, res) => {

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

  const sql = `
    INSERT INTO questions
    (
      quiz_id,
      question_text,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_option
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

      res.json({
        success: true,
        message: "Question added successfully",
        question_id: result.insertId
      });

    }
  );

});

/* GET QUIZZES */

router.get("/", verifyToken, (req, res) => {

  const sql = `
    SELECT
      q.id AS quiz_id,
      q.title,
      q.description,
      q.total_questions,
      q.time_limit,
      qs.id AS question_id,
      qs.question_text,
      qs.option_a,
      qs.option_b,
      qs.option_c,
      qs.option_d
    FROM quizzes q
    LEFT JOIN questions qs
    ON q.id = qs.quiz_id
    ORDER BY q.id, qs.id
  `;

  db.query(
    sql,
    (err, rows) => {

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
            question: row.question_text,
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

    }
  );

});

module.exports = router;