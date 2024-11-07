import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateCategories: (state, action) => {
      state.categories = action.payload;
    },
    addProductToCategoryBag: (state, action) => {
      state.categories["all"] = state.categories["all"].map((product) => {
        if (product.id === action.payload.id) {
          product.addedToBag = true;
        }

        return product;
      });
      state.categories[action.payload.category] = state.categories[
        action.payload.category
      ].map((product) => {
        if (product.id === action.payload.id) {
          product.addedToBag = true;
        }

        return product;
      });
    },
    removeProductFromCategoryBag: (state, action) => {
      state.categories["all"] = state.categories["all"].map((product) => {
        if (product.id === action.payload.id) {
          product.addedToBag = false;
        }

        return product;
      });
      state.categories[action.payload.category] = state.categories[
        action.payload.category
      ].map((product) => {
        if (product.id === action.payload.id) {
          product.addedToBag = false;
        }

        return product;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCategories,
  addProductToCategoryBag,
  removeProductFromCategoryBag,
} = categorySlice.actions;

export default categorySlice.reducer;
