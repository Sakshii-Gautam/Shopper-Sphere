import { createSlice } from '@reduxjs/toolkit';
import {
  getUserDetails,
  login,
  logout,
  registerUser,
  updateUserProfile,
  getAllUsersApi,
  deleteUserApi,
  userUpdateApi,
} from './userServices';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    usersList: [],
    userDetails: {},
    userUpdate: {
      isLoading: null,
      error: null,
      success: null,
    },
  },
  reducers: {
    userDetailsReset: (state) => {
      state.userInfo = {};
    },
    usersListReset: (state) => {
      state.usersList = [];
    },
    userUpdateReset: (state) => {
      state.userUpdate = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action?.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = {};
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action?.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = action?.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action?.payload;
        state.profileUpdatedSuccess = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getAllUsersApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsersApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersList = action?.payload;
      })
      .addCase(getAllUsersApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(deleteUserApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDeleteSuccess = true;
      })
      .addCase(deleteUserApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(userUpdateApi.pending, (state) => {
        state.userUpdate.isLoading = true;
      })
      .addCase(userUpdateApi.fulfilled, (state, action) => {
        state.userUpdate.isLoading = false;
        state.userUpdate.success = true;
      })
      .addCase(userUpdateApi.rejected, (state, action) => {
        state.userUpdate.isLoading = false;
        state.userUpdate.error = action.error.message;
      });
  },
});

export const { userDetailsReset, usersListReset, userUpdateReset } =
  userSlice.actions;
export default userSlice.reducer;
