import { cryptoInfo } from "@/types/CoinInfo";
import { createSlice } from "@reduxjs/toolkit";

type ExplorePageState = {
  exploreCrypto: cryptoInfo[];
};

const initialState: ExplorePageState = {
  exploreCrypto: [],
};

export const ExplorePageSlice = createSlice({
  name: "ExplorePage",
  initialState,
  reducers: {
    setExploreCrypto: (state, action) => {
      state.exploreCrypto = action.payload;
    },
  },
});

export const { setExploreCrypto } = ExplorePageSlice.actions;

export default ExplorePageSlice.reducer;
