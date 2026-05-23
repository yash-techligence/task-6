# 📌 Current Progress

## ✅ Completed

* Backend setup using Express.js
* MySQL database connection
* User Registration API
* User Login API
* JWT Authentication
* bcrypt Password Hashing
* Protected Routes Middleware
* React + Vite frontend setup
* Tailwind CSS setup
* GitHub branch-based collaboration setup
* `quizzes` and `questions` database tables
* POST /quiz/create — Create a new quiz
* POST /quiz/add-question — Add a question to a quiz
* GET /quiz — Fetch all quizzes with questions

## 🗄 Database Schema

### `users`
| Column | Type | Notes |
|--------|------|-------|
| id | INT | PK, Auto Increment |
| name | VARCHAR(255) | Not Null |
| email | VARCHAR(255) | Unique, Not Null |
| password | VARCHAR(255) | bcrypt hashed |

### `quizzes`
| Column | Type | Notes |
|--------|------|-------|
| id | INT | PK, Auto Increment |
| title | VARCHAR(255) | Not Null |
| created_at | TIMESTAMP | Default: current time |

### `questions`
| Column | Type | Notes |
|--------|------|-------|
| id | INT | PK, Auto Increment |
| quiz_id | INT | FK → quizzes.id |
| question_text | TEXT | Not Null |
| option_a | VARCHAR(255) | Not Null |
| option_b | VARCHAR(255) | Not Null |
| option_c | VARCHAR(255) | Not Null |
| option_d | VARCHAR(255) | Not Null |
| correct_option | CHAR(1) | a, b, c or d |


## 🔄 In Progress

* POST /submit — Submit quiz answers
* GET /leaderboard — Leaderboard system
* Frontend Integration

## 🛠 Upcoming

* `results` database table (Vaishnavi)
* Score calculation & storage (Harshal)
* Final backend integration
* API testing
* Full frontend-backend connection
* Deployment

## 🌿 Branches

| Branch | Owner | Work |
|--------|-------|------|
| `backend-auth` | Yash | Register, Login, JWT, Middleware |
| `quiz-tables-apis` | Anshul | Quiz tables, Quiz APIs |

