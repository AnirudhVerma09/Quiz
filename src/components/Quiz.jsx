import React, { useMemo } from "react";
import { useGetQuestionsQuery } from "../features/quizApi";
import he from "he";
import { useSearchParams } from "react-router";

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

  if (isLoading)
    return (
      <div className="flex justify-center items-center text-center h-screen text-4xl w-full text-[#EBE5C2] bg-[#504B38]">
        Loading....
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-center text-4xl w-full text-[#EBE5C2] bg-[#504B38]">
        Error: {error.message}
      </div>
    );

  return (
    <>
      <div className="flex justify-center items-center text-left w-full bg-[#504B38]">
        <ol className="list-decimal">
          {randomizedQuestions.map((question, index) => (
            <li className="p-2 text-[#EBE5C2]" key={index}>
              <h4>{he.decode(question.question)}</h4>
              <ul>
                {question.answers.map((answer, idx) => (
                  <li key={idx} className="mb-1">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={answer}
                      className="mr-2"
                    />
                    <label className="text-[#EBE5C2]">
                      {he.decode(answer)}
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default Quiz;
