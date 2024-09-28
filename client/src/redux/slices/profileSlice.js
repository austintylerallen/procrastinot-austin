// src/redux/slices/profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    error: null,
    loading: false,
  },
  reducers: {
    profileUpdateSuccess(state, action) {
      state.user = action.payload;
      state.error = null;
      state.loading = false;
    },
    profileUpdateFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { profileUpdateSuccess, profileUpdateFailure } = profileSlice.actions;
export default profileSlice.reducer;
