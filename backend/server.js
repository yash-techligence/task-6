const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db/db");
const verifyToken = require("./middleware/authMiddleware");
const quizRoutes = require("./routes/quiz");
const resultsRoutes = require("./routes/results");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/results", resultsRoutes);

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

  db.query(
    sql,
    [email],
    async (err, result) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: "Server Error"
        });

      }

      if (result.length === 0) {

        return res.json({
          success: false,
          message: "User not found"
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
          message: "Invalid Password"
        });

      }

      if (user.role !== role) {

        return res.json({
          success: false,
          message: `This account is not a ${role}`
        });

      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role
        },
        "secretkey",
        {
          expiresIn: "1h"
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
          role: user.role
        }
      });

    }
  );

});

/* QUIZ ROUTES */

app.use("/quiz", quizRoutes);

/* PROTECTED ROUTE */

app.get("/protected", verifyToken, (req, res) => {

  res.json({
    success: true,
    message: "Protected Route Accessed"
  });

});

/* QUIZ ROUTES */

const submitRoutes = require("./routes/submit");
const leaderboardRoutes = require("./routes/leaderboard");

app.use("/submit", submitRoutes);
app.use("/leaderboard", leaderboardRoutes);

/* SERVER */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});