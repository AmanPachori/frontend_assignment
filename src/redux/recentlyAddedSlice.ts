import { cryptoInfo } from "@/types/CoinInfo";
import { createSlice } from "@reduxjs/toolkit";

type recentlyAddedState = {
  items: cryptoInfo[];
};

const initialState: recentlyAddedState = {
  items: [],
};

export const recentlyAddedSlice = createSlice({
  name: "recentlyAdded",
  initialState,
  reducers: {
    addTorecentlyAdded: (state, action) => {
      const newItem = action.payload;
      const isDuplicate = state.items.some((item) => item.id === newItem.id);

      if (!isDuplicate) {
        state.items.push(newItem);
      }
    },
    removeFromrecentlyAdded: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addTorecentlyAdded, removeFromrecentlyAdded } =
  recentlyAddedSlice.actions;
export default recentlyAddedSlice.reducer;
