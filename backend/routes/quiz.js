const express = require("express");

const router = express.Router();

const db = require("../db/connection"); // ✅

const verifyToken = require("../middleware/auth"); // ✅

const adminMiddleware = require("../middleware/adminMiddleware");

/* =========================
   CREATE QUIZ
========================= */

router.post(
  "/create",
  verifyToken,
  adminMiddleware,
  (req, res) => {

    const { title, time_limit } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const sql =
      "INSERT INTO quizzes (title, timeLimit) VALUES (?, ?)";

    db.query(
      sql,
      [title, time_limit || 60],
      (err, result) => {

        if (err) {
          console.log(err);

          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        res.json({
          success: true,
          message: "Quiz created successfully",
          quiz_id: result.insertId,
        });
      }
    );
  }
);

/* =========================
   ADD QUESTION
========================= */

router.post(
  "/add-question",
  verifyToken,
  adminMiddleware,
  (req, res) => {

    const {
      quiz_id,
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
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
        message: "All fields are required",
      });
    }

    const sql = `
      INSERT INTO questions
      (
        quiz_id,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer
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
        answer,
      ],
      (err, result) => {

        if (err) {
          console.log(err);

          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        res.json({
          success: true,
          message: "Question added successfully",
          question_id: result.insertId,
        });
      }
    );
  }
);

/* =========================
   GET ALL QUIZZES
========================= */

router.get("/", (req, res) => {

  const sql = `
    SELECT
      q.id AS quiz_id,
      q.title,
      q.timeLimit,
      qs.id AS question_id,
      qs.question,
      qs.optionA,
      qs.optionB,
      qs.optionC,
      qs.optionD,
      qs.correctAnswer
    FROM quizzes q
    LEFT JOIN questions qs
    ON q.id = qs.quiz_id
    ORDER BY q.id DESC
  `;

  db.query(sql, (err, rows) => {

    if (err) {

      console.log(err);

      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    const quizMap = {};

    rows.forEach((row) => {

      if (!quizMap[row.quiz_id]) {

        quizMap[row.quiz_id] = {
          id: row.quiz_id,
          title: row.title,
          timeLimit: row.timeLimit || 60,
          questions: [],
        };
      }

      if (row.question) {

        quizMap[row.quiz_id].questions.push({
          id: row.question_id,
          question: row.question,
          option1: row.optionA,
          option2: row.optionB,
          option3: row.optionC,
          option4: row.optionD,
          correct_option: row.correctAnswer,
        });
      }
    });

    res.json({
      success: true,
      quizzes: Object.values(quizMap),
    });
  });
});

/* =========================
   GET SINGLE QUIZ
========================= */

router.get("/:id", (req, res) => {

  const quizId = req.params.id;

  const sql = `
    SELECT
      q.id AS quiz_id,
      q.title,
      q.timeLimit,
      qs.id AS question_id,
      qs.question,
      qs.optionA,
      qs.optionB,
      qs.optionC,
      qs.optionD,
      qs.correctAnswer
    FROM quizzes q
    LEFT JOIN questions qs
    ON q.id = qs.quiz_id
    WHERE q.id = ?
  `;

  db.query(sql, [quizId], (err, rows) => {

    if (err) {

      console.log(err);

      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    if (rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    const quiz = {
      id: rows[0].quiz_id,
      title: rows[0].title,
      timeLimit: rows[0].timeLimit || 60,
      questions: [],
    };

    rows.forEach((row) => {

      if (row.question) {

        quiz.questions.push({
          id: row.question_id,
          question: row.question,
          option1: row.optionA,
          option2: row.optionB,
          option3: row.optionC,
          option4: row.optionD,
          correct_option: row.correctAnswer,
        });
      }
    });

    res.json({
      success: true,
      quiz,
    });
  });
});

module.exports = router;