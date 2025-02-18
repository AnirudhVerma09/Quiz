import { createSlice } from "@reduxjs/toolkit";

const initialState = { startTime: null, endTime: null };

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.startTime = Date.now();
      state.endTime = null; 
    },
    stopTimer: (state) => {
      state.endTime = Date.now();
    },
    resetTimer: (state) => {
      state.startTime = null;
      state.endTime = null;
    },
  },
});

export const { startTimer, stopTimer, resetTimer } = timerSlice.actions;
export default timerSlice.reducer;
