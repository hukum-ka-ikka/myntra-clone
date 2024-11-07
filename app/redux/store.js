import { configureStore } from "@reduxjs/toolkit";
import bagReducer from "./reducers/bagSlice.js";
import productReducer from "./reducers/productSlice.js";
import categoryReducer from "./reducers/categorySlice.js";

const store = configureStore({
  reducer: {
    bag: bagReducer,
    product: productReducer,
    category: categoryReducer,
  },
});

export default store;
