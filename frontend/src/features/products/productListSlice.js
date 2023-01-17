import { createSlice } from '@reduxjs/toolkit';
import { productListApi } from './productListService';

const initialState = {
  products: [],
};

export const productListSlice = createSlice({
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

export default productListSlice.reducer;
