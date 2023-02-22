import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlicer";

export default configureStore({
  reducer: {
    products: productReducer,
  },
});
