import { Item } from "@/types/shop";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface CartState {
  items: Item[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      const existing = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existing) {
        existing.qty += action.payload.qty;
      } else {
        state.items.push(action.payload);
      }
    },

    setQty(state, action: PayloadAction<{ id: string; qty: number }>) {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        item.qty = Math.max(1, action.payload.qty);
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, setQty, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.qty, 0);
export const selectSubtotal = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.unitPriceSEK * item.qty, 0);
