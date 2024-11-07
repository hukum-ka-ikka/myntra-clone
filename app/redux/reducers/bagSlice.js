import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bagItems: [],
  total: 0,
  isBagLoaded: false,
};

export const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    updateBag: (state, action) => {
      state.bagItems = action.payload.products;
      state.total = action.payload.total;
      state.isBagLoaded = true;
    },
    emptyBag: (state) => {
      state.bagItems = [];
      state.total = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateBag, emptyBag } = bagSlice.actions;

export default bagSlice.reducer;
