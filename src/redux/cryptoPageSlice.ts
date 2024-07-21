import { CoinInfo, Graph } from "@/types/Coin";
import { createSlice } from "@reduxjs/toolkit";

type cryptoPageState = {
  CryptoData: CoinInfo;
  GraphData: Graph;
};

const initialState: cryptoPageState = {
  CryptoData: {} as CoinInfo,
  GraphData: [] as any,
};

export const cryptoPageSlice = createSlice({
  name: "cryptoPage",
  initialState,
  reducers: {
    setCryptoData: (state, action) => {
      state.CryptoData = action.payload;
    },
    setGraphData: (state, action) => {
      state.GraphData = action.payload;
    },
  },
});

export const { setCryptoData, setGraphData } = cryptoPageSlice.actions;

export default cryptoPageSlice.reducer;
