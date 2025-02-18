import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedAnswers: {},  // Keeps track of answers selected by the user
  score: 0,             // Keeps track of the score
  hasCompleted: false,   // Indicates if the quiz is completed
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    // Action to record an answer
    selectAnswer: (state, action) => {
      const { questionIndex, answer } = action.payload;
      state.selectedAnswers[questionIndex] = answer;
    },
    // Action to calculate the score after submitting
    submitQuiz: (state, action) => {
      const { questions } = action.payload;
      let score = 0;
      questions.forEach((question, index) => {
        if (state.selectedAnswers[index] === question.correct_answer) {
          score += 1;
        }
      });
      state.score = score;
      state.hasCompleted = true;
    },
    // Reset the quiz state (for restarting a new quiz)
    resetQuiz: (state) => {
      state.selectedAnswers = {};
      state.score = 0;
      state.hasCompleted = false;
    },
  },
});

export const { selectAnswer, submitQuiz, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
