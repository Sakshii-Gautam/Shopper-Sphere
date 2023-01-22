import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteProductApi = createAsyncThunk(
  'product/deleteProduct',
  async (id, { getState }) => {
    const {
      users: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/products/${id}`, config);
  }
);
