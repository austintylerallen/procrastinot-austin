// client/src/redux/slices/projectSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todo: [],
  working: [],
  completed: [],
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todo = action.payload;
    },
    setWorking: (state, action) => {
      state.working = action.payload;
    },
    setCompleted: (state, action) => {
      state.completed = action.payload;
    },
    addTodo: (state, action) => {
      state.todo.push(action.payload);
    },
    moveToWorking: (state, action) => {
      state.working.push(action.payload);
      state.todo = state.todo.filter(todo => todo.id !== action.payload.id);
    },
    moveToCompleted: (state, action) => {
      state.completed.push(action.payload);
      state.working = state.working.filter(work => work.id !== action.payload.id);
    },
  },
});

export const {
  setTodos,
  setWorking,
  setCompleted,
  addTodo,
  moveToWorking,
  moveToCompleted,
} = projectSlice.actions;

export default projectSlice.reducer;
