// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import TodoPage from './pages/TodoPage';
import WorkingPage from './pages/WorkingPage';
import CompletedPage from './pages/CompletedPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import { syncAuthState } from './redux/actions/authActions';
import StarBackground from './components/StarBackground'; // Import StarBackground

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(syncAuthState());
  }, [dispatch]);

  return (
    <Router>
      <StarBackground /> {/* Add StarBackground to the App */}
      {isAuthenticated && <Navbar />} {/* Show Navbar only if authenticated */}
      <Routes>
        {/* Redirect authenticated users to TodoPage if they try to access login or register */}
        {isAuthenticated ? (
          <>
            <Route path="/auth" element={<Navigate to="/projects/todo" />} />
            <Route path="/register" element={<Navigate to="/projects/todo" />} />
          </>
        ) : (
          <>
            {/* Public Routes */}
            <Route path="/auth" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        )}
        
        {/* Default route should point to login */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/projects/todo" : "/auth"} />} />
        
        {/* Private Routes */}
        <Route path="/projects/todo" element={<PrivateRoute element={TodoPage} />} />
        <Route path="/projects/working" element={<PrivateRoute element={WorkingPage} />} />
        <Route path="/projects/completed" element={<PrivateRoute element={CompletedPage} />} />
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/projects/todo" : "/auth"} />} />
      </Routes>
    </Router>
  );
};

export default App;
