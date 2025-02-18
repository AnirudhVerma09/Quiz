
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetTimer } from "../features/timerSlice";
import { resetQuiz } from "../features/quizSlice"; 
import { useNavigate } from "react-router-dom";

export default function Results() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Read the quiz state from Redux
  const { score, hasCompleted } = useSelector((state) => state.quiz);
  const { startTime, endTime } = useSelector((state) => state.timer);
  const total = 10; // You can also store this in Redux if needed

  const elapsedSeconds =
    endTime && startTime ? Math.floor((endTime - startTime) / 1000) : 0;
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

  const handleGiveQuizAgain = () => {
    // Reset the Redux states for a new quiz
    dispatch(resetQuiz());
    dispatch(resetTimer());
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-[#504B38]">
      <div className="bg-[#3E3A2A] p-6 rounded-lg shadow-lg">
        <h1 className="text-[#EBE5C2] text-2xl font-bold mb-4">Quiz Results</h1>
        <ul className="text-[#EBE5C2] text-lg">
          <li className="mb-2">
            <span className="font-bold">Time Taken: </span>
            {`${minutes} minutes ${seconds} seconds`}
          </li>
          <li className="mb-2">
            <span className="font-bold">Score: </span>
            {`${score} / ${total}`}
          </li>
          <li className="mb-2">
            <span className="font-bold">Accuracy: </span>
            {`${accuracy}%`}
          </li>
        </ul>
        <button
          onClick={handleGiveQuizAgain}
          className="mt-4 px-6 py-2 bg-[#EBE5C2] text-[#504B38] font-bold rounded-lg hover:bg-[#D9D2A8] transition"
        >
          Give quiz again
        </button>
      </div>
    </div>
  );
}
