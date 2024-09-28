import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, updateProjectStatus } from '../redux/actions/projectActions'; // Make sure to import the required actions

const WorkingPage = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects.filter((project) => project.status === 'Working'));
  
  const [timers, setTimers] = useState({}); // To keep track of timers for each project

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  // Function to handle moving project to a new status
  const handleMoveToStatus = (projectId, newStatus) => {
    dispatch(updateProjectStatus(projectId, newStatus));
  };

  // Function to handle timer start/stop
  const handleStartStopTimer = (projectId) => {
    if (timers[projectId]?.interval) {
      // Stop the timer
      clearInterval(timers[projectId].interval);
      setTimers((prev) => ({
        ...prev,
        [projectId]: { ...prev[projectId], interval: null },
      }));
    } else {
      // Start the timer
      const interval = setInterval(() => {
        setTimers((prev) => ({
          ...prev,
          [projectId]: { ...prev[projectId], time: (prev[projectId]?.time || 0) + 1 },
        }));
      }, 1000);
      setTimers((prev) => ({
        ...prev,
        [projectId]: { ...prev[projectId], interval },
      }));
    }
  };

  // Function to format time in hh:mm:ss
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="hero bg-primary flex items-center justify-center">
      <div className="container text-center">
        <h1 className="text-white text-7xl mb-12">Working On</h1>
        <div className="flex flex-col items-center">
          {/* Project List */}
          <div className="scroll-box max-h-custom-400 overflow-y-auto p-4 rounded-lg bg-gray-800 shadow-custom">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} className="todo-item bg-gray-900 p-6 rounded-lg shadow-custom mb-4 min-h-custom-150">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white mb-4">{project.description}</p>
                  {/* Timer */}
                  <div className="timer text-2xl font-bold text-white bg-blue-600 rounded-lg p-4 mb-4 shadow-md">
                    {formatTime(timers[project._id]?.time || 0)}
                  </div>
                  {/* Timer Controls */}
                  <div className="timer-controls flex space-x-4 justify-center">
                    <button
                      onClick={() => handleStartStopTimer(project._id)}
                      className={`button ${timers[project._id]?.interval ? 'bg-red-500' : 'bg-green-500'} text-white px-6 py-3 rounded-lg shadow-md`}
                    >
                      {timers[project._id]?.interval ? 'Stop' : 'Start'}
                    </button>
                    <button
                      onClick={() => handleMoveToStatus(project._id, 'Completed')}
                      className="button bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md"
                    >
                      Move to Completed
                    </button>
                    <button
                      onClick={() => handleMoveToStatus(project._id, 'To-Do')}
                      className="button bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md"
                    >
                      Move to To-Do
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white">No working projects available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingPage;
