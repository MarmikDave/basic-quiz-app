# MERN Quiz Application

This is a MERN (MongoDB, Express, React, Node.js) Quiz Application that allows users to register, log in, take quizzes, and view results.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)

## Features
- User registration and login
- Quiz selection and taking
- Result display after quiz completion
- Responsive design using Tailwind CSS

## Technologies Used
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git (optional, for cloning the repository)

### Clone the Repository
```bash
git clone https://github.com/MarmikDave/quiz-app-task.git
cd mern-quiz-app
```

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory and add your MongoDB connection string:
   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React application:
   ```bash
   npm run dev
   ```

## Running the Application
- The backend server will run on `http://localhost:5000`.
- The frontend application will run on `http://localhost:5173` (or the port specified by Vite).

## API Endpoints
- **Auth Routes**
  - `POST /api/auth/register`: Register a new user
  - `POST /api/auth/login`: Log in a user

- **Quiz Routes**
  - `POST /api/quiz`: Create a new quiz
  - `GET /api/quiz`: Fetch all quizzes
  - `GET /api/quiz/:section`: Fetch quiz details by section
  - `POST /api/quiz/submit/:section`: Submit quiz answers and get results
