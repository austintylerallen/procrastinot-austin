import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

// Initial state for projects
const initialState = {
  projects: [],
  loading: false,
  error: null,
};

// Project slice
const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    // Reducers for fetching projects
    getProjectsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getProjectsSuccess(state, action) {
      state.loading = false;
      state.projects = action.payload;
    },
    getProjectsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Reducer for adding a project
    addProjectSuccess(state, action) {
      state.projects.push(action.payload); // Add new project to the state
      state.loading = false;
      state.error = null;
    },
    addProjectFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Reducers for updating project status
    updateProjectStatusSuccess(state, action) {
      const { id, status } = action.payload;
      const projectIndex = state.projects.findIndex((project) => project._id === id);
      if (projectIndex !== -1) {
        state.projects[projectIndex].status = status;
      }
    },
    updateProjectStatusFailure(state, action) {
      state.error = action.payload;
    },
  },
});

// Memoized Selectors
const selectProjectsState = (state) => state.projects;

export const selectAllProjects = createSelector(
  [selectProjectsState],
  (projectsState) => projectsState.projects
);

export const selectTodoProjects = createSelector(
  [selectAllProjects],
  (projects) => projects.filter((project) => project.status === 'To-Do')
);

export const selectWorkingProjects = createSelector(
  [selectAllProjects],
  (projects) => projects.filter((project) => project.status === 'Working')
);

export const selectCompletedProjects = createSelector(
  [selectAllProjects],
  (projects) => projects.filter((project) => project.status === 'Completed')
);

export const {
  getProjectsStart,
  getProjectsSuccess,
  getProjectsFailure,
  addProjectSuccess,
  addProjectFailure,
  updateProjectStatusSuccess,
  updateProjectStatusFailure,
} = projectSlice.actions;

export default projectSlice.reducer;
