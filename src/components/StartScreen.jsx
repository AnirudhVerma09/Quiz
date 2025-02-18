import React from "react";
import { useNavigate } from "react-router";

const StartScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center text-center h-screen w-full bg-[#504B38]">
      <div className="bg-[#3E3A2A] p-6 rounded-lg shadow-lg">
        <h1 className="text-[#EBE5C2] text-2xl font-bold mb-4">Take a Quiz</h1>
        <p className="text-[#EBE5C2] mb-4">
          Press the button to start the quiz
        </p>
        <button
          onClick={() => navigate("/Categories")}
          className="px-4 py-2 bg-[#EBE5C2] text-[#504B38] font-bold rounded-lg hover:bg-[#D9D2A8] transition"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
