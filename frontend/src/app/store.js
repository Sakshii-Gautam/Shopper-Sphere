import { configureStore } from '@reduxjs/toolkit';
import productDetailsSlice from '../features/products/productDetailsSlice';
import productListSlice from '../features/products/productListSlice';
const store = configureStore({
  reducer: {
    productList: productListSlice,
    productDetails: productDetailsSlice,
  },
});

export default store;
