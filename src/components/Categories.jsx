// Categories.jsx
import React, { useState } from "react";
import { useGetCategoriesQuery } from "../features/quizApi";
import he from "he";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startTimer } from "../features/timerSlice";

export default function Categories() {
  const { data, error, isLoading } = useGetCategoriesQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (isLoading)
    return (
      <div className="flex justify-center items-center text-center text-4xl h-screen w-full text-[#EBE5C2] bg-[#504B38]">
        Loading....
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center text-center text-4xl h-screen w-full text-[#EBE5C2] bg-[#504B38]">
        Error: {error.message}
      </div>
    );

  return (
    <div className="flex justify-center items-center text-center h-screen w-full bg-[#504B38]">
      <form
        className="bg-[#3E3A2A] p-6 rounded-lg shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(startTimer()); // Start the timer when category is selected
          navigate(`/Quiz?category=${selectedCategory}`);
        }}
      >
        <h2 className="text-[#EBE5C2] text-xl mb-4">
          Select Trivia Categories
        </h2>
        <ul className="space-y-2">
          {data.trivia_categories.map((category, index) => (
            <li key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                id={`category-${index}`}
                value={category.id}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-checkbox h-4 w-4 text-[#EBE5C2] accent-[#EBE5C2]"
              />
              <label htmlFor={`category-${index}`} className="text-[#EBE5C2]">
                {he.decode(category.name)}
              </label>
            </li>
          ))}
        </ul>
        <button
          type="submit"
          disabled={!selectedCategory}
          className="mt-4 px-4 py-2 bg-[#EBE5C2] text-[#504B38] font-bold rounded-lg hover:bg-[#D9D2A8] transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
