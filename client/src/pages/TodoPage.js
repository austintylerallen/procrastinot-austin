import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, addProject } from '../redux/actions/projectActions';
import { selectTodoProjects } from '../redux/slices/projectSlice'; // Import memoized selector
import Modal from '../components/Modal';

const TodoPage = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectTodoProjects); // Use memoized selector

  const [isModalVisible, setModalVisible] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '' });

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      dispatch(addProject(newProject)); // Dispatch addProject action
      setModalVisible(false); // Close the modal
      setNewProject({ title: '', description: '' }); // Reset form
    }
  };

  return (
    <div className="hero bg-primary flex items-center justify-center">
      <div className="container text-center">
        <h1 className="text-white text-7xl mb-12">To-Do Projects</h1>
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
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} className="todo-item bg-gray-900 p-6 rounded-lg shadow-custom mb-4 min-h-custom-150">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <button className="button bg-working text-white px-4 py-2 rounded-lg shadow-md hover:bg-working-light">
                      Move to Working
                    </button>
                    <button className="button bg-completed text-white px-4 py-2 rounded-lg shadow-md hover:bg-completed-light">
                      Move to Completed
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white">No To-Do projects available</p>
            )}
          </div>
          {/* Add Project Button */}
          <button
            onClick={() => setModalVisible(true)} // Open modal on click
            className="button add-button bg-purple-500 text-white px-8 py-4 mt-8 text-xl rounded-lg shadow-md"
          >
            Add New Project
          </button>
        </div>
      </div>
      {/* Modal for Adding Project */}
      <Modal isVisible={isModalVisible} onClose={() => setModalVisible(false)}>
        <h2 className="text-3xl mb-4">Add New Project</h2>
        <input
          type="text"
          name="title"
          value={newProject.title}
          onChange={handleInputChange}
          placeholder="Project Title"
          className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-todo w-full mb-4"
        />
        <textarea
          name="description"
          value={newProject.description}
          onChange={handleInputChange}
          placeholder="Project Description"
          className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-todo w-full mb-4"
        />
        <button
          onClick={handleAddProject}
          className="button bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 w-full"
        >
          Add Project
        </button>
      </Modal>
    </div>
  );
};

export default TodoPage;
