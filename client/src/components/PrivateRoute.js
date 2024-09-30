import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  // If authenticated, render the child route component
  return <Outlet />;
};

export default PrivateRoute;
