import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import messages_en from "../locales/en.json";
import Expense from "../types/expense";

const rent = {
  icon: "House",
  label: messages_en["rent&utils"],
  bgColor: "green.500",
  id: "rent&utils",
  total: 0,
  fields: [{ label: "", amount: null }],
};

const food = {
  icon: "Pizza",
  label: messages_en.food,
  bgColor: "yellow.500",
  id: "food",
  total: 0,
  fields: [{ label: "", amount: null }],
};

const entertainment = {
  icon: "DiscoBall",
  label: messages_en.entertainment,
  bgColor: "red.500",
  id: "entertainment",
  total: 0,
  fields: [{ label: "", amount: null }],
};

const defaultInitialState = [rent, food, entertainment];

const storedState = JSON.parse(localStorage.getItem("expenses") || "null");

type Field = {
  label: string;
  amount: number | null;
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: (storedState || defaultInitialState) as Expense[],
  reducers: {
    add(state, action: PayloadAction<Expense>) {
      state.push(action.payload);
    },
    delete(state, action: PayloadAction<string>) {
      state = state.filter((i) => i.id !== action.payload);
    },
    updateFields(
      state,
      action: PayloadAction<{ id: string; fields: Field[] }>
    ) {
      const find = state.find((i) => i.id === action.payload.id)!;
      find.fields = action.payload.fields;
    },
    updateTotal(state, action: PayloadAction<{ id: string; total: number }>) {
      const find = state.find((i) => i.id === action.payload.id)!;
      find.total = action.payload.total;
    },
    save(state) {
      localStorage.setItem("expenses", JSON.stringify(state));
    },
  },
});

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;
