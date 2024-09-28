// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null, // Store user details here
  userId: null, // Store userId here
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user; // Set user info
      state.userId = action.payload.user._id; // Set userId
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.userId = null; // Clear userId on logout
    },
    syncAuthState: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.userId = action.payload.user._id; // Sync userId
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, syncAuthState } = authSlice.actions;
export default authSlice.reducer;
