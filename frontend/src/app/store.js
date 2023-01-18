import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../features/Cart/cartSlice';
import productDetailsSlice from '../features/products/productDetailsSlice';
import productListSlice from '../features/products/productListSlice';
import userSlice from '../features/users/userSlice';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  cart: cartItemsFromStorage,
  users: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  initialState,
  reducer: {
    productList: productListSlice,
    productDetails: productDetailsSlice,
    cart: cartSlice,
    users: userSlice,
  },
});

export default store;
