import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/actions/authActions';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = { username, email, password };
    try {
      // Dispatch the registerUser action
      await dispatch(registerUser(userData));
      // Redirect to login page or dashboard after successful registration
      navigate('/auth');
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary text-white font-mono">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl mb-6 text-center">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-lg">Username</label>
            <input
              className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-todo"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">Email</label>
            <input
              className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-todo"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">Password</label>
            <input
              className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-todo"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="p-3 rounded-lg bg-todo hover:bg-todo-dark transition duration-200"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
