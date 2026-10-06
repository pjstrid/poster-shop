import { ThemeName } from "@/theme/colors";
import { Currency } from "@/types/shop";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  theme: ThemeName;
  currency: Currency;
}

const initialState: SettingsState = { theme: "dark", currency: "SEK" };

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    setCurrency(state, action: PayloadAction<Currency>) {
      state.currency = action.payload;
    },
  },
});

export const { toggleTheme, setCurrency } = settingsSlice.actions;
export default settingsSlice.reducer;
