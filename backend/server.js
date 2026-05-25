const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db/connection");
const verifyToken = require("./middleware/auth");
const quizRoutes = require("./routes/quiz");
const resultsRoutes = require("./routes/results");
const submitRoutes = require("./routes/submit");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/quiz", quizRoutes);
app.use("/results", resultsRoutes);
app.use("/submit", submitRoutes);
app.use("/leaderboard", leaderboardRoutes);

/* HOME */
app.get("/", (req, res) => {
  res.send("API Running");
});

/* REGISTER */
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(
      sql,
      [username, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.log("REGISTER ERROR:", err);
          if (err.code === "ER_DUP_ENTRY") {
            return res.json({
              success: false,
              message: "Email already exists",
            });
          }
          return res.status(500).json({
            success: false,
            message: "Server Error",
          });
        }
        res.json({
          success: true,
          message: "User Registered Successfully",
        });
      }
    );
  } catch (error) {
    console.log("SERVER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* LOGIN */
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(
    sql,
    [email],
    async (err, result) => {
      if (err) {
        console.log("LOGIN ERROR:", err);
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
      const match = await bcrypt.compare(
        password,
        user.password
      );
      if (!match) {
        return res.json({
          success: false,
          message: "Invalid Password",
        });
      }
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
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
          username: user.username,
          name: user.username,
          email: user.email,
          role: user.role || "user",
        },
      });
    }
  );
});

/* PROTECTED ROUTE */
app.get("/protected", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Protected Route Accessed",
  });
});

/* SERVER */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});