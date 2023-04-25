import { createSlice } from "@reduxjs/toolkit";

const searchInitialValues = {
  searchValue: "",
  isSearching: false,
  isResults: false
}

const SearchContentSlice = createSlice({
  name: "SearchContentSlice",
  initialState: searchInitialValues,
  reducers: {
    setValue: (state, action) => {
      const { value } = action.payload;
      state.searchValue = value;
    },
    startSearching: (state) => {
      state.isSearching = true;
    },
    stopSearching: (state) => {
      state.isSearching = false;
    },
    showResults: (state) => {
      state.isResults = true;
    }
  }
})

export const searchContentActions = SearchContentSlice.actions;

export default SearchContentSlice;