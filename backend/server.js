const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("./db/db");

const verifyToken = require("./middleware/authMiddleware");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("./db/db");

const verifyToken = require("./middleware/authMiddleware");

const quizRoutes = require("./routes/quiz");
const resultsRoutes = require("./routes/results");
const submitRoutes = require("./routes/submit");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();

/* CORS */

app.use(cors({
  origin: "https://quiz-frontend-9b7q.onrender.com",
  credentials: true,
}));

/* MIDDLEWARE */

app.use(express.json());

/* ROUTES */

app.use("/results", resultsRoutes);
app.use("/quiz", quizRoutes);
app.use("/submit", submitRoutes);
app.use("/leaderboard", leaderboardRoutes);

/* HOME */

app.get("/", (req, res) => {
  res.send("API Running");
});

/* REGISTER */

app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(
      sql,
      [name, email, hashedPassword, role || "user"],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Registration Failed",
          });
        }

        res.json({
          success: true,
          message: "Registration Successful",
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* LOGIN */

app.post("/login", (req, res) => {
  const { email, password, role } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }

    if (result.length === 0) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({
        success: false,
        message: "Invalid Password",
      });
    }

    if (user.role !== role) {
      return res.json({
        success: false,
        message: `This account is not a ${role}`,
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      "secretkey",
      {
        expiresIn: "1h",
      }
    );

    res.json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
});

/* PROTECTED ROUTE */

app.get("/protected", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Protected Route Accessed",
  });
});

/* ADD QUESTION */

app.post("/add-question", (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body;

  const sql = `
    INSERT INTO questions
    (question, optionA, optionB, optionC, optionD, correctAnswer)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [question, optionA, optionB, optionC, optionD, correctAnswer],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Failed to add question",
        });
      }

      res.json({
        success: true,
        message: "Question Added Successfully",
      });
    }
  );
});

/* GET QUESTIONS */

app.get("/questions", (req, res) => {
  const sql = "SELECT * FROM questions";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch questions",
      });
    }

    res.json({
      success: true,
      questions: result,
    });
  });
});

/* SERVER */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});