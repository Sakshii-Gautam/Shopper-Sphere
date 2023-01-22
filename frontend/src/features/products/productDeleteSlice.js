import { createSlice } from '@reduxjs/toolkit';
import { deleteProductApi } from './productDeleteService';

const initialState = {};

export const productDeleteSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteProductApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(deleteProductApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.success = true;
      });
  },
});

export default productDeleteSlice.reducer;
