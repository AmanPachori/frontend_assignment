import { cryptoInfo } from "@/types/CoinInfo";
import { createSlice } from "@reduxjs/toolkit";

type HomePageState = {
  trendingCrypto: cryptoInfo[];
};

const initialState: HomePageState = {
  trendingCrypto: [],
};

export const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setTrendigCrypto: (state, action) => {
      state.trendingCrypto = action.payload;
    },
  },
});

export const { setTrendigCrypto } = homePageSlice.actions;

export default homePageSlice.reducer;
