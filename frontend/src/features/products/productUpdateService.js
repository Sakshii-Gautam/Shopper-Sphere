import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateProductApi = createAsyncThunk(
  'product/updateProduct',
  async (product, { getState }) => {
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
      `/api/products/${product._id}`,
      product,
      config
    );
    return data;
  }
);
