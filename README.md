# Quiz Platform

A modern full-stack Quiz Platform built using React, Node.js, Express.js, MySQL, and Vite.

## Live Demo

Frontend:
https://task-6-frontend-pgda.onrender.com

Backend:
https://task-6-2-1zvc.onrender.com

---

## Features

### User Features
- User Registration & Login
- JWT Authentication
- Attempt Quizzes
- Timer-based Quiz System
- View Quiz Results
- Leaderboard Ranking
- Responsive UI

### Admin Features
- Admin Login
- Create Quizzes
- Add Questions Dynamically
- Manage Quiz Data
- View Platform Activity

---

## Tech Stack

### Frontend
- React.js
- Vite
- CSS
- React Router

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt

### Database
- MySQL (Railway)

### Deployment
- Frontend: Render
- Backend: Render

---

## Project Structure

```bash
task-6/
│
├── backend/
│   ├── routes/
│   ├── middleware/
│   ├── db/
│   └── server.js
│
├── client/
│   ├── src/
│   ├── pages/
│   ├── components/
│   └── api/
│
└── README.md

```

Installation

Clone Repository
git clone https://github.com/yash-techligence/task-6.git
Install Dependencies

Backend:

cd backend
npm install

Frontend:

cd client
npm install

---

Environment Variables

Create .env file inside backend folder:

DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=railway
DB_PORT=your_port

JWT_SECRET=your_secret

---

Run Project

Backend:

npm start

Frontend:

npm run dev

---

Deployment
Frontend

Deployed on Render Static Site.

Backend

Deployed on Render Web Service.

Database

Hosted on Railway MySQL.

---

## Contributors

This project was developed collaboratively by the project team as part of a full-stack web development internship/project.

---

License

This project is developed for educational and internship purposes.


Then save and push:

```bash id="j9m2rx"
git add .
git commit -m "Added professional README"
git push origin feature/score-leaderboard
