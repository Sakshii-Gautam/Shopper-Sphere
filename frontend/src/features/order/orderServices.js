import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrderApi = createAsyncThunk(
  'order/createOrder',
  async (order, { getState }) => {
    const {
      users: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/orders`, order, config);
    return data;
  }
);

export const getOrderDetailsApi = createAsyncThunk(
  'order/getOrderDetails',
  async (id, { getState }) => {
    const {
      users: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${id}`, config);
    return data;
  }
);

export const payOrderApi = createAsyncThunk(
  'order/payOrder',
  async (orderInfo, { getState }) => {
    const { id, paymentResult } = orderInfo;
    const {
      users: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${id}/pay`,
      paymentResult,
      config
    );
    return data;
  }
);

export const myOrdersListApi = createAsyncThunk(
  'order/getMyOrdersList',
  async (args, thunkAPI) => {
    console.log('thunkAPI', thunkAPI);
    const {
      users: { userInfo },
    } = thunkAPI.getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/myorders`, config);
    return data;
  }
);
