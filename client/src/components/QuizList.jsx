import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuizList = () => {
  const sections = ["HTML", "CSS", "JavaScript", "React"];
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSectionClick = (section) => {
    navigate(`/quiz/${section}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Select a Quiz Section
      </h2>{" "}
      <button
        onClick={handleLogout}
        className="bg-blue-500 text-white px-10 py-2 mb-4 absolute top-10 right-4 rounded hover:bg-blue-600"
      >
        Logout
      </button>
      <div className="flex flex-wrap justify-center">
        {" "}
        {/* Flex container for cards */}
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-gray-200 shadow-md rounded-lg p-7 m-4 cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-300 hover:scale-105" // Updated background color and hover effect
          >
            <button
              onClick={() => handleSectionClick(section)}
              className="text-lg text-blue-600"
            >
              {section}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
