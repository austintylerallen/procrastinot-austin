import React from 'react';
import { useDispatch } from 'react-redux';
import { updateProjectStatus } from '../redux/actions/projectActions';

const ProjectItem = ({ project }) => {
  const dispatch = useDispatch();

  // Handler for moving project status
  const handleMoveTo = (newStatus) => {
    dispatch(updateProjectStatus(project._id, newStatus));
  };

  return (
    <div className="todo-item bg-gray-900 p-6 rounded-lg shadow-custom mb-4 min-h-custom-150">
      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-white mb-4">{project.description}</p>
      <div className="flex justify-between items-center">
        {project.status === 'To-Do' && (
          <>
            <button
              onClick={() => handleMoveTo('Working')}
              className="button bg-working text-white px-4 py-2 rounded-lg shadow-md hover:bg-working-light"
            >
              Move to Working
            </button>
            <button
              onClick={() => handleMoveTo('Completed')}
              className="button bg-completed text-white px-4 py-2 rounded-lg shadow-md hover:bg-completed-light"
            >
              Move to Completed
            </button>
          </>
        )}
        {project.status === 'Working' && (
          <button
            onClick={() => handleMoveTo('Completed')}
            className="button bg-completed text-white px-4 py-2 rounded-lg shadow-md hover:bg-completed-light"
          >
            Move to Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectItem;
