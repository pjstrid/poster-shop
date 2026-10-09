import { configureStore } from "@reduxjs/toolkit";
import cart from "./cartSlice";
import settings from "./settingsSlice";

export const store = configureStore({
  reducer: { settings, cart },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
