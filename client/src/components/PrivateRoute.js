// src/components/PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  // Check if the user is authenticated
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/auth" />;
  }

  // Render the requested element if authenticated
  return <Element />;
};

export default PrivateRoute;
