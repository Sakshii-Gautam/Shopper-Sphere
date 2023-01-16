import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const productListApi = createAsyncThunk('PRODUCT_LIST', async () => {
  let response = await axios.get('/api/products');
  return response?.data;
});
