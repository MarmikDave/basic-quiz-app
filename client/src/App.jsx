/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import QuizList from './components/QuizList';
import QuizDetails from './components/QuizDetails';
import QuizResult from './components/QuizResult';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quiz/:id" element={<QuizDetails />} />
        <Route path="/result" element={<QuizResult />} />
      </Routes>
    </Router>
  );
};

export default App;
