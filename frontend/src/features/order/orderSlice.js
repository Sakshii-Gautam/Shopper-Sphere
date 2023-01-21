import { createSlice } from '@reduxjs/toolkit';
import {
  createOrderApi,
  getOrderDetailsApi,
  payOrderApi,
  myOrdersListApi,
} from './orderServices';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderItems: [],
    shippingAddress: {},
    myOrdersList: [],
  },
  reducers: {
    orderPayReset: (state, action) => {
      return {};
    },
    myOrderListReset: (state, action) => {
      state.orders = [];
    },
  },
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

    builder
      .addCase(getOrderDetailsApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action?.payload;
      })
      .addCase(getOrderDetailsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(payOrderApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(payOrderApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderPaid = true;
      })
      .addCase(payOrderApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(myOrdersListApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(myOrdersListApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myOrdersList = action?.payload;
      })
      .addCase(myOrdersListApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { orderPayReset, myOrderListReset } = orderSlice.actions;
export default orderSlice.reducer;
