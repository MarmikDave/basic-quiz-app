const express = require("express");
const Quiz = require("../models/Quiz");
const router = express.Router();

// Creating a new quiz
router.post("/", async (req, res) => {
  const { title, section, questions } = req.body;
  try {
    const quiz = await Quiz.create({ title, section, questions });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz", error });
  }
});

// Fetching quiz based on sections
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, "title section");
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetching quiz details by section
router.get("/:section", async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ section: req.params.section });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Quiz Results
router.post("/submit/:section", async (req, res) => {
  const { answers } = req.body;
  const { section } = req.params;
  try {
    const quiz = await Quiz.findOne({ section });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (q.correctAnswer === answers[i]) score++;
    });

    res.json({ score, total: quiz.questions.length });
  } catch (err) {
    console.error("Error in quiz submission:", err);
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
