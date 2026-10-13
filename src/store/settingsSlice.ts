import type { Rates } from "@/api/currency";
import { ThemeName } from "@/theme/colors";
import { Currency } from "@/types/shop";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  theme: ThemeName;
  currency: Currency;
  rates: Rates;
  ratesDate: string | null;
}

const initialState: SettingsState = {
  theme: "dark",
  currency: "SEK",
  rates: {},
  ratesDate: null,
};

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
    setRates(state, action: PayloadAction<{ rates: Rates; date: string }>) {
      state.rates = action.payload.rates;
      state.ratesDate = action.payload.date;
    },
  },
});

export const { toggleTheme, setCurrency, setRates } = settingsSlice.actions;
export default settingsSlice.reducer;
