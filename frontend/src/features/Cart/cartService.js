import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { addToCart, removeCartItem } from './cartSlice';

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
