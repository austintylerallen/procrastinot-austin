import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../redux/actions/authActions';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="dark-background p-4 flex justify-between items-center">
      {/* Left Section with Image */}
      <div className="flex items-center">
        {/* SpaceNerd Image */}
        <img
          src="/SpaceNerd.jpeg" // Path to the image in the public directory
          alt="Astronaut"
          className="w-12 h-12 mr-4 object-cover rounded-full" // Adjust size and appearance as needed
        />
        <h1 className="text-white text-2xl font-bold font-mono">Procrastinot</h1>
      </div>

      {/* Middle Navigation Links */}
      <div className="text-white font-mono">
        {isAuthenticated ? (
          <div className="flex space-x-4">
            <Link to="/projects/todo" className="button todo-button">
              To-Do
            </Link>
            <Link to="/projects/working" className="button working-button">
              Working
            </Link>
            <Link to="/projects/completed" className="button completed-button">
              Completed
            </Link>
          </div>
        ) : null}
      </div>

      {/* Right Section with Auth Buttons */}
      <div>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="button bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Logout
          </button>
        ) : (
          <div className="flex space-x-4">
            <Link to="/auth" className="button bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md">
              Login
            </Link>
            <Link to="/register" className="button bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
