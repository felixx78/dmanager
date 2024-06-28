import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./languageReducer";
import expensesReducer from "./expensesReducer";

const store = configureStore({
  reducer: {
    language: languageReducer,
    expenses: expensesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
