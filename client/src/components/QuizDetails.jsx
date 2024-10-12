import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizDetails = () => {
  const { id: section } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/quiz/${section}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setQuiz(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchQuiz();
  }, [section]);

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setAnswers({ ...answers, [currentQuestionIndex]: selectedOption });
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(answers[currentQuestionIndex - 1] || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/quiz/submit/${section}`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("Submission response:", data);
      navigate("/result", { state: { score: data.score, total: data.total } });
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-3xl relative">
        <button
          onClick={() => navigate("/quizzes")}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center">{quiz.title}</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-8 relative">
            <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {currentQuestionIndex + 1} of {quiz.questions.length}
            </div>
            <p className="text-xl mb-6">
              {quiz.questions[currentQuestionIndex].question}
            </p>
            {quiz.questions[currentQuestionIndex].options.map(
              (option, optionIndex) => (
                <div key={optionIndex} className="mb-4">
                  <label className="flex items-center text-lg">
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={optionIndex}
                      checked={selectedOption === optionIndex}
                      onChange={() => setSelectedOption(optionIndex)}
                      className="mr-3 h-5 w-5"
                    />
                    {option}
                  </label>
                </div>
              )
            )}
          </div>
          <div className="bg-gray-50 px-8 py-4 flex justify-between items-center">
            {currentQuestionIndex > 0 ? (
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}
            <button
              type={
                currentQuestionIndex < quiz.questions.length - 1
                  ? "button"
                  : "submit"
              }
              onClick={
                currentQuestionIndex < quiz.questions.length - 1
                  ? handleNext
                  : handleSubmit
              }
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out"
            >
              {currentQuestionIndex < quiz.questions.length - 1
                ? "Next"
                : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
