// src/redux/actions/authActions.js
import axiosInstance from '../../utils/axiosInstance';
import { loginStart, loginSuccess, loginFailure, logout } from '../slices/authSlice'; 

// Register User Action
export const registerUser = (userData, navigate) => async (dispatch) => {
    try {
      dispatch(loginStart());
      const response = await axiosInstance.post('/auth/register', userData);
  
      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
  
      // Dispatch the loginSuccess action to set user as logged in
      dispatch(loginSuccess(response.data.token));
  
      // Redirect to the To-Do page
      navigate('/projects/todo');
    } catch (error) {
      dispatch(loginFailure(error.response.data.message));
      console.error('Failed to register user:', error);
      throw error; // Rethrow to catch in the RegisterPage
    }
};

// Login User Action
export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch(loginStart());

    // Use axiosInstance to make the request
    const response = await axiosInstance.post('/auth/login', userData);

    // Save token to localStorage
    localStorage.setItem('token', response.data.token);

    // Dispatch the loginSuccess action
    dispatch(loginSuccess(response.data.token));
  } catch (error) {
    // Dispatch the loginFailure action if there's an error
    dispatch(loginFailure(error.response.data.message));
  }
};

// Logout User Action
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem('token');

  // Dispatch the logout action
  dispatch(logout());
};

// Sync Auth State with Local Storage
export const syncAuthState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    dispatch(loginSuccess(token));
  }
};
