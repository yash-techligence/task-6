const express = require("express");
const router = express.Router();
const { submitQuiz } = require("../controllers/submitController");
const verifyToken = require("../middleware/auth");

router.post("/", verifyToken, submitQuiz);

module.exports = router;