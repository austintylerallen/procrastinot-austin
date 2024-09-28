// src/redux/actions/authActions.js
import axiosInstance from '../../utils/axiosInstance';
import { loginStart, loginSuccess, loginFailure, logout } from '../slices/authSlice'; 

// Register User Action
export const registerUser = (userData, navigate) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await axiosInstance.post('/auth/register', userData);

    // Extract token and user information from the response
    const { token, user } = response.data;

    // Save token to localStorage
    localStorage.setItem('token', token);

    // Save user information to localStorage
    localStorage.setItem('user', JSON.stringify(user));

    // Dispatch the loginSuccess action to set user as logged in
    dispatch(loginSuccess({ token, user }));

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
  
      // Check if response has data property
      if (response.data) {
        const { token, user } = response.data; // Destructure token and user from data
  
        // Save token and user info to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user)); // Save user info
  
        // Dispatch the loginSuccess action with token and user info
        dispatch(loginSuccess({ token, user }));
      } else {
        // If no data in response, throw error to be caught by catch block
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      // Dispatch the loginFailure action if there's an error
      dispatch(loginFailure(error.response?.data?.message || 'Login failed. Please try again.'));
    }
  };

// Logout User Action
export const logoutUser = () => (dispatch) => {
  // Remove token and user info from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  // Dispatch the logout action
  dispatch(logout());
};

// Delete User Action
export const deleteUser = (userId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/users/${userId}`);
    dispatch(logout()); // Log out the user after deleting the account
    alert('Profile deleted successfully.');
  } catch (error) {
    console.error('Error deleting user profile:', error);
    alert('Failed to delete profile. Please try again.');
  }
};

// Sync Auth State with Local Storage
// Sync Auth State with Local Storage
export const syncAuthState = () => (dispatch) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')); // Parse user info from localStorage
    if (token && user) {
      dispatch(loginSuccess({ token, user })); // Sync both token and user info
    }
  };
  
