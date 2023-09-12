import { configureStore } from "@reduxjs/toolkit";
import subjectsReducer from "./subjectSlice";
import modelSetReducer from "./modelSet/modelsetSlice";

const store = configureStore({
  reducer: {
    subjects: subjectsReducer,
    modelSets: modelSetReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
