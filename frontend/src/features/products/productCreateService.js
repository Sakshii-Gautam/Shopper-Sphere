import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createProductApi = createAsyncThunk(
  'product/createProduct',
  async (args, { getState }) => {
    const {
      users: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/products`, {}, config);
    return data;
  }
);
