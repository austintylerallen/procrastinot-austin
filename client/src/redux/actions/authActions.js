import axios from 'axios';
import { loginStart, loginSuccess, loginFailure, logout } from '../slices/authSlice'; // Use the correct actions

// Register User Action
export const registerUser = (userData) => async (dispatch) => {
  try {
    // Simulate API call for registration
    const response = await axios.post('/auth/register', userData);

    // Save token to localStorage if needed
    localStorage.setItem('token', response.data.token);

    // Dispatch the loginSuccess action to set user as logged in
    dispatch(loginSuccess(response.data.token));
  } catch (error) {
    console.error('Failed to register user:', error);
    throw error; // Rethrow to catch in the RegisterPage
  }
};

// Login User Action
export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch(loginStart());

    // Simulate API call
    const response = await axios.post('/auth/login', userData);

    // Save token to localStorage
    localStorage.setItem('token', response.data.token);

    // Dispatch the loginSuccess action
    dispatch(loginSuccess(response.data.token));
  } catch (error) {
    // Dispatch the loginFailure action if there's an error
    dispatch(loginFailure(error.response.data.message));
  }
};

export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem('token');

  // Dispatch the logout action
  dispatch(logout());
};
