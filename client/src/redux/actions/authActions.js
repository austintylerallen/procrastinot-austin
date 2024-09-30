// src/redux/actions/authActions.js
import axiosInstance from '../../utils/axiosInstance';
import { loginStart, loginSuccess, loginFailure, logout } from '../slices/authSlice';

// Register User Action
// Register User Action
export const registerUser = (userData, navigate) => async (dispatch) => {
  try {
    dispatch(loginStart());
    
    // Make the register request to the backend
    const response = await axiosInstance.post('/auth/register', userData);

    // Check if the response contains the user object
    const { token, user } = response.data || {};

    // Ensure user and token exist
    if (!user || !token) {
      throw new Error('Invalid response from server. User registration failed.');
    }

    // Save token to localStorage
    localStorage.setItem('token', token);

    // Save user information to localStorage
    localStorage.setItem('user', JSON.stringify(user));

    // Dispatch loginSuccess action to update state with token and user data
    dispatch(loginSuccess({ token, user }));

    // Redirect user to the To-Do page after registration
    navigate('/projects/todo');
  } catch (error) {
    // Handle the error, displaying the message from backend if available
    const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
    dispatch(loginFailure(errorMessage));

    console.error('Failed to register user:', errorMessage);
    throw error; // Optionally rethrow the error for further handling in the RegisterPage
  }
};


// Login User Action
export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch(loginStart());
    
    // Make the login request to the backend
    const response = await axiosInstance.post('/auth/login', userData);
    
    // Check if response contains data
    if (response.data) {
      const { token, user } = response.data; // Destructure token and user from response

      // Save token and user info to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Dispatch loginSuccess action with token and user data
      dispatch(loginSuccess({ token, user }));
    } else {
      // Throw error if response doesn't contain data
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    // Dispatch loginFailure action if there's an error, fallback to default error message
    const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
    dispatch(loginFailure(errorMessage));

    console.error('Failed to login user:', errorMessage);
  }
};

// Logout User Action
export const logoutUser = () => (dispatch) => {
  // Clear token and user data from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  // Dispatch logout action to clear state
  dispatch(logout());
};

// Delete User Action
export const deleteUser = (userId) => async (dispatch) => {
  try {
    // Make delete request to the backend
    await axiosInstance.delete(`/users/${userId}`);
    
    // Dispatch logout action after successful deletion
    dispatch(logout());

    alert('Profile deleted successfully.');
  } catch (error) {
    // Handle delete error
    console.error('Error deleting user profile:', error);
    alert('Failed to delete profile. Please try again.');
  }
};

// Sync Auth State with Local Storage
// Sync Auth State with Local Storage
export const syncAuthState = () => (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user'); // Get user as a string

    // Check if both token and user exist in localStorage
    if (token && user) {
      // Parse user data only if it exists and is a valid string
      const parsedUser = user !== "undefined" ? JSON.parse(user) : null;

      // If parsedUser is valid, sync the state
      if (parsedUser) {
        dispatch(loginSuccess({ token, user: parsedUser }));
      } else {
        // If user data is invalid, log out
        dispatch(logout());
      }
    } else {
      // If token or user is missing, log the user out
      dispatch(logout());
    }
  } catch (error) {
    // Handle potential JSON parsing errors and other issues
    console.error('Failed to sync auth state from localStorage:', error);
    dispatch(logout()); // Clear auth state if sync fails
  }
};

