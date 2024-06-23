import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: localStorage.getItem("language") || "en",
  reducers: {
    set(state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const languageActions = languageSlice.actions;
export default languageSlice.reducer;
