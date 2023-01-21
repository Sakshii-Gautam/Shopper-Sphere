import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { myOrderListReset } from '../order/orderSlice';
import { userDetailsReset } from './userSlice';

export const login = createAsyncThunk(
  'users/login',
  async (credentials, { dispatch }) => {
    const { email, password } = credentials;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  }
);

export const logout = createAsyncThunk(
  'users/logout',
  async (args, { dispatch }) => {
    localStorage.removeItem('userInfo');
    dispatch(userDetailsReset());
    dispatch(myOrderListReset());
  }
);

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (credentials, { dispatch }) => {
    const { name, email, password } = credentials;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );
    dispatch(login({ email, password }));
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  }
);

export const getUserDetails = createAsyncThunk(
  'users/userDetails',
  async (id, { getState }) => {
    const {
      users: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}`, config);
    return data;
  }
);

export const updateUserProfile = createAsyncThunk(
  'users/updateUserProfile',
  async (user, { getState }) => {
    const {
      users: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/users/profile`, user, config);
    return data;
  }
);
