// client/src/redux/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import projectReducer from '../slices/projectSlice'; // Import the project reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer, // Add the project reducer
  },
});

export default store;
