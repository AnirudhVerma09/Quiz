
import { configureStore } from "@reduxjs/toolkit";
import { quizApi } from "../features/quizApi";
import timerReducer from "../features/timerSlice";
import quizReducer from "../features/quizSlice"; 

export const store = configureStore({
  reducer: {
    [quizApi.reducerPath]: quizApi.reducer,
    timer: timerReducer,
    quiz: quizReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quizApi.middleware),
});
