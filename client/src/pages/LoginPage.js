import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      dispatch(loginSuccess(response.data.token));
    } catch (err) {
      dispatch(loginFailure(err.response.data.message));
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
      </div>
    </div>
  );
};

export default LoginPage;
