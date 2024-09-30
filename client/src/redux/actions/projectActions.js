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

// Action to fetch projects specific to the logged-in user
export const getProjects = () => async (dispatch) => {
  dispatch(getProjectsStart());
  try {
    const response = await axiosInstance.get('/projects'); // Token is included in axiosInstance automatically
    dispatch(getProjectsSuccess(response.data)); // Dispatch the projects for the current user
  } catch (error) {
    dispatch(getProjectsFailure(error.response?.data?.message || 'Error fetching projects'));
  }
};

// Action to add a new project for the logged-in user
export const addProject = (projectData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/projects', projectData); // Token and user association handled on the backend
    dispatch(addProjectSuccess(response.data)); // Successfully added project
    dispatch(getProjects()); // Fetch updated projects after adding a new one
  } catch (error) {
    dispatch(addProjectFailure(error.response?.data?.message || 'Error adding project'));
  }
};

// Action to update the status of a project (ensure the project belongs to the logged-in user)
export const updateProjectStatus = (id, status) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/projects/${id}/status`, { status }); // Backend ensures the project belongs to the user
    dispatch(updateProjectStatusSuccess({ id, status: response.data.status })); // Update project status in the store
  } catch (error) {
    dispatch(updateProjectStatusFailure(error.response?.data?.message || 'Error updating project status'));
  }
};
