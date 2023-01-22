import { createSlice } from '@reduxjs/toolkit';
import { updateProductApi } from './productUpdateService';

const initialState = {
  product: {},
};

export const productUpdateSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProductReset: (state) => {
      state.product = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProductApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(updateProductApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.success = true;
        state.product = action?.payload;
      });
  },
});

export const { updateProductReset } = productUpdateSlice.actions;
export default productUpdateSlice.reducer;
