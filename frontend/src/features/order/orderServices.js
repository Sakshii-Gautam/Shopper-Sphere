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
