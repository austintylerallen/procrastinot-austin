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
      <div className="text-white font-mono">
        {isAuthenticated ? (
          <>
            <Link to="/projects/todo" className="button todo-button">
              To-Do
            </Link>
            <Link to="/projects/working" className="button working-button">
              Working
            </Link>
            <Link to="/projects/completed" className="button completed-button">
              Completed
            </Link>
          </>
        ) : null}
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
