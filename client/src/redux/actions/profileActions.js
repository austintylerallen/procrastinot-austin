// src/redux/actions/profileActions.js
import axiosInstance from '../../utils/axiosInstance';
import { profileUpdateSuccess, profileUpdateFailure } from '../slices/profileSlice'; // Create these actions in the profile slice

export const updateProfile = (userId, userData) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, userData);
    dispatch(profileUpdateSuccess(response.data));
  } catch (error) {
    dispatch(profileUpdateFailure(error.response?.data?.message || 'Error updating profile'));
  }
};
