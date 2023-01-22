import { createSlice } from '@reduxjs/toolkit';
import { createProductApi } from './productCreateService';

const initialState = {};

export const productCreateSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    createProductReset: (state, action) => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(createProductApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.success = true;
        state.product = action?.payload;
      });
  },
});

export const { createProductReset } = productCreateSlice.actions;
export default productCreateSlice.reducer;
