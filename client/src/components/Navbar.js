// src/components/Navbar.js
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
      <div className="flex items-center">
        <img src="/SpaceNerd.jpeg" alt="Logo" className="w-10 h-10 mr-4 rounded-full" />
        {isAuthenticated && (
          <>
            <Link to="/projects/todo" className="button todo-button mr-4">
              To-Do
            </Link>
            <Link to="/projects/working" className="button working-button mr-4">
              Working
            </Link>
            <Link to="/projects/completed" className="button completed-button mr-4">
              Completed
            </Link>
            <Link to="/profile" className="button profile-button mr-4">
              Profile
            </Link> {/* Add profile link */}
            <Link to="/about" className="button about-button">
              About Us
            </Link>
          </>
        )}
      </div>
      <div>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="button bg-red-500 hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/auth" className="button bg-green-500 hover:bg-green-700">
              Login
            </Link>
            <Link to="/register" className="button bg-blue-500 hover:bg-blue-700">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
