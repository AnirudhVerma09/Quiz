// Quiz.jsx
import React, { useMemo } from "react";
import { useGetQuestionsQuery } from "../features/quizApi";
import he from "he";
import { useSearchParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { stopTimer } from "../features/timerSlice";
import { selectAnswer, submitQuiz } from "../features/quizSlice";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Quiz = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { data, error, isLoading } = useGetQuestionsQuery({
    amount: 10,
    category,
  });

  const startTime = useSelector((state) => state.timer.startTime);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use memoization to shuffle questions
  const randomizedQuestions = useMemo(() => {
    if (!data) return [];
    return data.results.map((question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
  }, [data]);

  const leftQuestions = randomizedQuestions.slice(0, 5);
  const rightQuestions = randomizedQuestions.slice(5, 10);

  // Dispatch the selectAnswer action on answer selection
  const handleAnswerChange = (questionIndex, answer) => {
    dispatch(selectAnswer({ questionIndex, answer }));
  };

  // On submit, stop the timer and dispatch submitQuiz to calculate score
  const handleSubmit = () => {
    dispatch(stopTimer());
    dispatch(submitQuiz({ questions: randomizedQuestions }));
    navigate("/Result");
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-4xl w-full text-[#EBE5C2] bg-[#504B38]">
        Loading....
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-4xl w-full text-[#EBE5C2] bg-[#504B38]">
        Error: {error.message}
      </div>
    );

  return (
    <div className="flex flex-col h-screen w-full bg-[#504B38]">
      <div className="flex flex-grow">
        {/* Left Column */}
        <div className="w-1/2 p-4 flex flex-col justify-center">
          <ol className="list-decimal text-[#EBE5C2]">
            {leftQuestions.map((question, index) => (
              <li key={index} className="p-2">
                <h4>{he.decode(question.question)}</h4>
                <ul className="list-disc ml-4">
                  {question.answers.map((answer, idx) => (
                    <li key={idx} className="mb-1">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={answer}
                        onChange={() => handleAnswerChange(index, answer)}
                        className="mr-2"
                      />
                      <label>{he.decode(answer)}</label>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
        {/* Right Column */}
        <div className="w-1/2 p-4 flex flex-col justify-center">
          <ol start="6" className="list-decimal text-[#EBE5C2]">
            {rightQuestions.map((question, index) => {
              const questionIndex = index + 5;
              return (
                <li key={questionIndex} className="p-2">
                  <h4>{he.decode(question.question)}</h4>
                  <ul className="list-disc ml-4">
                    {question.answers.map((answer, idx) => (
                      <li key={idx} className="mb-1">
                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          value={answer}
                          onChange={() =>
                            handleAnswerChange(questionIndex, answer)
                          }
                          className="mr-2"
                        />
                        <label>{he.decode(answer)}</label>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      {/* Submit Button */}
      <div className="p-4 flex justify-center bg-[#3E3A2A]">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-[#EBE5C2] text-[#504B38] font-bold rounded-lg hover:bg-[#D9D2A8] transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Quiz;
