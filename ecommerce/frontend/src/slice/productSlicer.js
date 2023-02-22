import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/api/v1";
export const getProducts = createAsyncThunk("getProducts/product", async () => {
  const res = await axios.get(url + "/products");
  return res.data.products;
});
export const getProductDetails = createAsyncThunk(
  "getProductDetails/product",
  async (id) => {
    const res = await axios.get(url + `/products/${id}`);
    return res.data.product;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productDetails: {},
    errorMsg: null,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.isError = null;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.isError = action.error.message;
    });
    builder.addCase(getProductDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productDetails = action.payload;
      state.isError = null;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.productDetails = null;
      state.isError = action.error.message;
    });
  },
});

export default productSlice.reducer;
