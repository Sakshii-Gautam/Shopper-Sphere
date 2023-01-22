import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { myOrderListReset } from '../order/orderSlice';
import { userDetailsReset, usersListReset } from './userSlice';

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
    dispatch(usersListReset());
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

export const getAllUsersApi = createAsyncThunk(
  'users/getAllUsers',
  async (args, { getState }) => {
    const {
      users: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users`, config);
    return data;
  }
);

export const deleteUserApi = createAsyncThunk(
  'users/deleteUser',
  async (id, { getState }) => {
    const {
      users: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/users/${id}`, config);
    return data;
  }
);

export const userUpdateApi = createAsyncThunk(
  'users/updateUser',
  async (user, { dispatch, getState }) => {
    const {
      users: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);
    dispatch(getUserDetails(data._id));
    return data;
  }
);
