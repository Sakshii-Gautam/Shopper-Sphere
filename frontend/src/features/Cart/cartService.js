import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  addToCart,
  removeCartItem,
  saveShippingAddress,
  savePaymentMethod,
} from './cartSlice';

export const addToCartApi = createAsyncThunk(
  'cart/addToCart',
  async ({ id, qty }, { getState, dispatch }) => {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(
      addToCart({
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: qty,
      })
    );
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  }
);

export const removeCartItemApi = createAsyncThunk(
  'cart/removeCartItem',
  async (id, { getState, dispatch }) => {
    dispatch(removeCartItem(id));
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  }
);

export const saveShippingAddressApi = createAsyncThunk(
  'cart/saveShippingAddress',
  async (data, { getState, dispatch }) => {
    dispatch(saveShippingAddress(data));
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  }
);

export const savePaymentMethodApi = createAsyncThunk(
  'cart/savePaymentMethod',
  async (data, { getState, dispatch }) => {
    dispatch(savePaymentMethod(data));
    localStorage.setItem('paymentMethod', JSON.stringify(data));
  }
);
