import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../features/Cart/cartSlice';
import orderSlice from '../features/order/orderSlice';
import productCreateSlice from '../features/products/productCreateSlice';
import productDeleteSlice from '../features/products/productDeleteSlice';
import productDetailsSlice from '../features/products/productDetailsSlice';
import productListSlice from '../features/products/productListSlice';
import productUpdateSlice from '../features/products/productUpdateSlice';
import userSlice from '../features/users/userSlice';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  users: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  initialState,
  reducer: {
    productList: productListSlice,
    productDetails: productDetailsSlice,
    productDelete: productDeleteSlice,
    productCreate: productCreateSlice,
    productUpdate: productUpdateSlice,
    cart: cartSlice,
    users: userSlice,
    orders: orderSlice,
  },
});

export default store;
