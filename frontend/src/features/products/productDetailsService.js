import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const productDetailsApi = createAsyncThunk(
  'PRODUCT_DETAILS',
  async (id) => {
    let response = await axios.get(`/api/products/${id}`);
    return response?.data;
  }
);
