import { configureStore } from "@reduxjs/toolkit";
import { wishlistSlice } from "./wishlistSlice";
import { recentlyAddedSlice } from "./recentlyAddedSlice";
import { homePageSlice } from "./homePageSlice";
import { ExplorePageSlice } from "./explorePageSlice";
import { cryptoPageSlice } from "./cryptoPageSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistSlice.reducer,
    recentlyAdded: recentlyAddedSlice.reducer,
    home: homePageSlice.reducer,
    explore: ExplorePageSlice.reducer,
    crypto: cryptoPageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
