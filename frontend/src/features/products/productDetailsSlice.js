import { createSlice } from '@reduxjs/toolkit';
import { productDetailsApi } from './productDetailsService';

const initialState = {
  product: {
    reviews: [],
  },
};

export const productDetailsService = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productDetailsApi.pending, (state) => {
        state.isLoading = true;
        state.product = {};
      })
      .addCase(productDetailsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(productDetailsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.product = action?.payload;
      });
  },
});

export default productDetailsService.reducer;
