import { createSlice } from '@reduxjs/toolkit';
import { productListApi } from './productService';

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productListApi.pending, (state) => {
        state.isLoading = true;
        state.products = [];
      })
      .addCase(productListApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(productListApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.products = action?.payload;
      });
  },
});

export default productSlice.reducer;
