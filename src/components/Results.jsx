import React from 'react';

export default function Results() {
  const timeTaken = "5 minutes";
  const score = "8/10";
  const accuracy = "80%";

  return (
    <div className="flex justify-center items-center h-screen w-full bg-[#504B38]">
      <div className="bg-[#3E3A2A] p-6 rounded-lg shadow-lg">
        <h1 className="text-[#EBE5C2] text-2xl font-bold mb-4">Quiz Results</h1>
        <ul className="text-[#EBE5C2] text-lg">
          <li className="mb-2">
            <span className="font-bold">Time Taken: </span>{timeTaken}
          </li>
          <li className="mb-2">
            <span className="font-bold">Score: </span>{score}
          </li>
          <li className="mb-2">
            <span className="font-bold">Accuracy: </span>{accuracy}
          </li>
        </ul>
      </div>
    </div>
  );
}
