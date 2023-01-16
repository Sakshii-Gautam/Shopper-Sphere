import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../features/products/productSlice';

const store = configureStore({
  reducer: {
    productList: productSlice,
  },
});

export default store;
