// src/redux/actions/projectActions.js
import axiosInstance from '../../utils/axiosInstance';
import {
  getProjectsStart,
  getProjectsSuccess,
  getProjectsFailure,
  addProjectSuccess,
  addProjectFailure,
  updateProjectStatusSuccess,
  updateProjectStatusFailure,
} from '../slices/projectSlice';

// Action to fetch all projects
export const getProjects = () => async (dispatch) => {
  dispatch(getProjectsStart());
  try {
    const response = await axiosInstance.get('/projects');
    dispatch(getProjectsSuccess(response.data));
  } catch (error) {
    dispatch(getProjectsFailure(error.response?.data?.message || 'Error fetching projects'));
  }
};

// Action to add a new project
export const addProject = (projectData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/projects', projectData);
    dispatch(addProjectSuccess(response.data));
    dispatch(getProjects()); // Fetch updated projects after adding a new one
  } catch (error) {
    dispatch(addProjectFailure(error.response?.data?.message || 'Error adding project'));
  }
};

// Action to update the status of a project
export const updateProjectStatus = (id, status) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/projects/${id}/status`, { status });
    dispatch(updateProjectStatusSuccess({ id, status: response.data.status }));
  } catch (error) {
    dispatch(updateProjectStatusFailure(error.response?.data?.message || 'Error updating project status'));
  }
};
