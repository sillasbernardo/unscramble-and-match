import { configureStore } from "@reduxjs/toolkit";
import SearchContentSlice from "./SearchContent";

const appStore = configureStore({
  reducer: {
    searchContent: SearchContentSlice.reducer
  }
})

export default appStore;