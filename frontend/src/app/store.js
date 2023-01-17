import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../features/Cart/cartSlice';
import productDetailsSlice from '../features/products/productDetailsSlice';
import productListSlice from '../features/products/productListSlice';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  cart: cartItemsFromStorage,
};

const store = configureStore({
  initialState,
  reducer: {
    productList: productListSlice,
    productDetails: productDetailsSlice,
    cart: cartSlice,
  },
});

export default store;
