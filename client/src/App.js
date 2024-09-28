import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoPage from './pages/TodoPage';
import WorkingPage from './pages/WorkingPage';
import CompletedPage from './pages/CompletedPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // Import RegisterPage

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/projects/todo" element={<TodoPage />} />
        <Route path="/projects/working" element={<WorkingPage />} />
        <Route path="/projects/completed" element={<CompletedPage />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* Add RegisterPage route */}
      </Routes>
    </Router>
  );
};

export default App;
