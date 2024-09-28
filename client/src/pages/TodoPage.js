import React from 'react';

const TodoPage = () => {
  return (
    <div className="hero bg-primary flex items-center justify-center">
      <div className="container text-center">
        <h1 className="text-white text-7xl mb-12">To-Do</h1>
        <div className="flex flex-col items-center">
          {/* Navigation Links */}
          <div className="flex space-x-4 mb-8">
            <a href="/dashboard" className="button bg-manage text-white px-8 py-4 text-xl rounded-lg shadow-md hover:bg-manage-light">
              Dashboard
            </a>
            <a href="/projects/todo" className="button bg-todo text-white px-8 py-4 text-xl rounded-lg shadow-md hover:bg-todo-light">
              To-Do
            </a>
            <a href="/projects/working" className="button bg-working text-white px-8 py-4 text-xl rounded-lg shadow-md hover:bg-working-light">
              Working
            </a>
            <a href="/projects/completed" className="button bg-completed text-white px-8 py-4 text-xl rounded-lg shadow-md hover:bg-completed-light">
              Completed
            </a>
          </div>
          {/* Project List */}
          <div className="scroll-box max-h-custom-400 overflow-y-auto p-4 rounded-lg bg-gray-800 shadow-custom">
            {/* Map over projects and render todo-items */}
            {/* Example todo item */}
            <div className="todo-item bg-gray-900 p-6 rounded-lg shadow-custom mb-4 min-h-custom-150">
              <h3 className="text-xl font-bold text-white mb-2">Project Title</h3>
              <p className="text-white mb-4">Project Description</p>
              {/* Timer and buttons can go here */}
            </div>
          </div>
          {/* Add Project Button */}
          <button className="button add-button bg-purple-500 text-white px-8 py-4 mt-8 text-xl rounded-lg shadow-md">
            Add New Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
