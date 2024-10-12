import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const QuizResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, total } = location.state || {};

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    // console.log("Location state:", location.state);
  }, [location]);

  if (score === undefined || total === undefined) {
    return <div className="p-8">Loading results...</div>;
  }
  return (
    <div className="relative p-8">
      <button
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/quizzes")}
      >
        Back to Quiz List
      </button>
      <div className="flex items-start justify-center h-screen">
        {" "}
        <div className="mt-16 bg-white shadow-lg rounded-lg p-6 text-center">
          {" "}
          <h2 className="text-2xl mb-4">Quiz Results</h2>
          <p className="text-lg font-semibold">
            You got <span className="text-blue-500">{score}</span> out of{" "}
            <span className="text-blue-500">{total}</span> correct.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
