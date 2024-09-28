import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, updateProjectStatus } from '../redux/actions/projectActions'; // Import actions

const CompletedPage = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const projects = useSelector((state) => state.projects.projects.filter((project) => project.status === 'Completed'));

  useEffect(() => {
    dispatch(getProjects()); // Fetch projects on component mount
  }, [dispatch]);

  // Function to handle moving project status
  const handleMoveToStatus = (projectId, newStatus) => {
    dispatch(updateProjectStatus(projectId, newStatus)); // Dispatch the update status action
  };

  return (
    <div className="hero bg-primary flex items-center justify-center">
      <div className="container text-center">
        <h1 className="text-white text-7xl mb-12">Completed Projects</h1>
        <div className="flex flex-col items-center">
          {/* Project List */}
          <div className="scroll-box max-h-custom-400 overflow-y-auto p-4 rounded-lg bg-gray-800 shadow-custom">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} className="todo-item bg-gray-900 p-6 rounded-lg shadow-custom mb-4 min-h-custom-150">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white mb-4">{project.description}</p>
                  <p className="text-white">Total Time Spent: {formatTime(project.totalTime || 0)}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleMoveToStatus(project._id, 'Working')}
                      className="button bg-working text-white px-4 py-2 rounded-lg shadow-md hover:bg-working-light"
                    >
                      Move to Working
                    </button>
                    <button
                      onClick={() => handleMoveToStatus(project._id, 'To-Do')}
                      className="button bg-todo text-white px-4 py-2 rounded-lg shadow-md hover:bg-todo-light"
                    >
                      Move to To-Do
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white">No completed projects available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format time in hh:mm:ss
const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default CompletedPage;
