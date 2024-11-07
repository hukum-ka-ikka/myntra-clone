import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  areProductsLoaded: false,
  products: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      state.areProductsLoaded = true;
      state.products = action.payload;
    },
    addProductToBag: (state, action) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload) {
          product.addedToBag = true;
        }

        return product;
      });
    },
    removeProductFromBag: (state, action) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload) {
          product.addedToBag = false;
        }

        return product;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadProducts, addProductToBag, removeProductFromBag } =
  productSlice.actions;

export default productSlice.reducer;
