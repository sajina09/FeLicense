import { configureStore } from "@reduxjs/toolkit";
import subjectsReducer from "./subjectSlice";

const store = configureStore({
  reducer: {
    subjects: subjectsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
