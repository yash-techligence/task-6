# Quiz Platform

A full-stack Quiz Platform built using React, Node.js, Express.js, MySQL, and Vite.

This application allows Admins to create quiz questions dynamically and Users to attempt quizzes, submit answers, and view scores with leaderboard functionality.

---

# Features

## Authentication System
- User Registration
- User Login
- Admin Login
- Role-based Authentication

## Admin Features
- Add Quiz Questions
- Add Multiple Options
- Set Correct Answer
- Store Questions in MySQL Database

## User Features
- Attempt Quiz
- Select Answers
- Submit Quiz
- Automatic Score Calculation
- Percentage Calculation
- Leaderboard Display

## UI Features
- Responsive Design
- Modern Gradient Theme
- Interactive Buttons
- Dynamic Quiz Cards

---

# Technologies Used

## Frontend
- React.js
- React Router DOM
- Vite
- CSS

## Backend
- Node.js
- Express.js

## Database
- MySQL
- phpMyAdmin

## Other Packages
- bcryptjs
- cors
- mysql2
- nodemon

---

# Project Structure

```bash
task-6/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── package.json
│   └── database connection
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone <repository-link>
```

---

# Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Database Setup

Create MySQL database:

```sql
CREATE DATABASE quiz_platform;
```

Create users table:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(50)
);
```

Create questions table:

```sql
CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  optionA VARCHAR(255) NOT NULL,
  optionB VARCHAR(255) NOT NULL,
  optionC VARCHAR(255) NOT NULL,
  optionD VARCHAR(255) NOT NULL,
  correctAnswer VARCHAR(255) NOT NULL
);
```

---

# Application Flow

## Admin Flow
1. Login as Admin
2. Create Quiz Questions
3. Save Questions in Database

## User Flow
1. Register/Login
2. Start Quiz
3. Select Answers
4. Submit Quiz
5. View Result and Leaderboard

---

# Future Improvements

- Timer Based Quiz
- Real Database Leaderboard
- User Profile System
- Quiz Categories
- Result History
- Admin Analytics Dashboard
- Dark/Light Theme Toggle
- JWT Authentication
- Protected Routes

---

# Contributors

This project was developed collaboratively by the project team.

---

# License

This project is for educational and learning purposes.
