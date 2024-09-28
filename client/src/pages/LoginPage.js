// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import axiosInstance from '../utils/axiosInstance'; // Update this line

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
  
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
  
      // Check if the response and response.data are defined
      if (response && response.data && response.data.data) {
        // Extract token and user from response.data.data
        const { token, user } = response.data.data; // Correct extraction
  
        // Save token and user info to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user)); // Save user info
  
        // Dispatch the loginSuccess action with token and user info
        dispatch(loginSuccess({ token, user }));
  
        // Navigate to To-Do page after successful login
        navigate('/projects/todo');
      } else {
        // If no data in response, throw error to be caught by catch block
        console.error('Unexpected response format:', response);
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      // Use optional chaining to safely access error message
      const errorMessage = err?.response?.data?.message || 'Login failed. Please try again.';
      console.error('Login error:', errorMessage); // Log the error message for better debugging
      dispatch(loginFailure(errorMessage));
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary text-white font-mono">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-todo"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-todo"
          />
          <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded-lg bg-todo ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-todo-dark'} transition duration-200`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        <div className="mt-4 text-center">
          <p>Don't have an account?</p>
          <button
            onClick={() => navigate('/register')}
            className="text-todo hover:text-todo-dark underline"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
