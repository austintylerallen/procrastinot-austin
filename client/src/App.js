import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import TodoPage from './pages/TodoPage';
import WorkingPage from './pages/WorkingPage';
import CompletedPage from './pages/CompletedPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage'; // Import ProfilePage
import PrivateRoute from './components/PrivateRoute';
import { syncAuthState } from './redux/actions/authActions';
import StarBackground from './components/StarBackground'; // Import StarBackground
import LandingPage from './pages/LandingPage'; // Import LandingPage

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(syncAuthState());
  }, [dispatch]);

  return (
    <Router>
      {!isAuthenticated && <StarBackground />} {/* Show Star Background when not authenticated */}
      {isAuthenticated && <Navbar />} {/* Show Navbar when authenticated */}
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/auth" element={<Navigate to="/projects/todo" />} />
            <Route path="/register" element={<Navigate to="/projects/todo" />} />
          </>
        ) : (
          <>
            <Route path="/auth" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<LandingPage />} /> {/* Show LandingPage when not authenticated */}
          </>
        )}
        
        <Route path="/" element={<Navigate to={isAuthenticated ? "/projects/todo" : "/auth"} />} />
        
        {/* Private Routes */}
        <Route path="/projects/todo" element={<PrivateRoute element={TodoPage} />} />
        <Route path="/projects/working" element={<PrivateRoute element={WorkingPage} />} />
        <Route path="/projects/completed" element={<PrivateRoute element={CompletedPage} />} />
        <Route path="/profile" element={<PrivateRoute element={ProfilePage} />} /> {/* Add Profile Route */}

        {/* Public About Us Route */}
        <Route path="/about" element={<AboutPage />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/projects/todo" : "/auth"} />} />
      </Routes>
    </Router>
  );
};

export default App;
