import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: localStorage.getItem("language") || "en",
  reducers: {
    set(_, action: PayloadAction<string>) {
      localStorage.setItem("language", action.payload);
      return action.payload;
    },
  },
});

export const languageActions = languageSlice.actions;
export default languageSlice.reducer;
