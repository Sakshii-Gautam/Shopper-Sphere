import { createSlice } from '@reduxjs/toolkit';
import { createOrderApi } from './orderServices';

const orderSlice = createSlice({
  name: 'order',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrderApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderCreated = true;
        state.order = action?.payload;
      })
      .addCase(createOrderApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
