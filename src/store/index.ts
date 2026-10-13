import { configureStore } from "@reduxjs/toolkit";
import cart from "./cartSlice";
import settings from "./settingsSlice";
import toast from "./toastSlice";

export const store = configureStore({
  reducer: { settings, cart, toast },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
