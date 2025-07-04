import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = location.state || { role: 'buyer' }; // Default to buyer if no role is passed

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role === 'buyer') {
      try {
        const res = await axios.post('/api/buyer/login', { email, password });
        localStorage.setItem('buyerToken', res.data.token);
        localStorage.setItem('isBuyerAuthenticated', 'true');
        navigate('/buyer/dashboard');
      } catch (err) {
        alert('Login failed');
      }
    } else if (role === 'seller') {
      try {
        const res = await axios.post('/api/seller/login', { email, password });
        localStorage.setItem('sellerToken', res.data.token);
        localStorage.setItem('isSellerAuthenticated', 'true');
        navigate('/seller/dashboard');
      } catch (err) {
        alert(err.response?.data?.message || 'Login failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Login as a {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>
        <p className="text-center text-gray-500 mb-8">Welcome back!</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-600"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-600"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" state={{ role }} className="font-semibold text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm; 