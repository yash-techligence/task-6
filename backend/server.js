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

          if (err.code === "ER_DUP_ENTRY") {

            res.json({
              success: false,
              message: "Email already exists"
            });

          } else {

            console.log(err);

            res.status(500).send(err);

          }

        } else {

          res.json({
            success: true,
            message: "User Registered Successfully"
          });

        }

      }
    );

  } catch (error) {

    console.log(error);

    res.status(500).send(error);

  }

});

/* LOGIN */

app.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email = ?";

  db.query(
    sql,
    [email],
    async (err, result) => {

      if (err) {

        res.status(500).send(err);

      } else {

        if (result.length > 0) {

          const user = result[0];

          const match = await bcrypt.compare(
            password,
            user.password
          );

          if (match) {

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
              token
            });

          } else {

            res.json({
              success: false,
              message: "Invalid Password"
            });

          }

        } else {

          res.json({
            success: false,
            message: "User not found"
          });

        }

      }

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