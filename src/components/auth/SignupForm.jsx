import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [licence, setLicence] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = location.state || { role: 'buyer' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (role === 'seller') {
        await axios.post('/api/seller/signup', {
          fullName: name,
          email,
          password,
          licenceNumber: licence,
        });
        alert('Registered! Await admin verification.');
        navigate('/');
        return;
      }
      if (role === 'buyer') {
        const res = await axios.post('/api/buyer/signup', {
          fullName: name,
          email,
          password,
        });
        localStorage.setItem('buyerToken', res.data.token);
        localStorage.setItem('isBuyerAuthenticated', 'true');
        navigate('/buyer/dashboard');
      } else if (role === 'seller') {
        navigate('/seller/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create a {role.charAt(0).toUpperCase() + role.slice(1)} Account
        </h2>
        <p className="text-center text-gray-500 mb-8">Get started with us!</p>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-600"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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
          {role === 'seller' && (
            <div>
              <label htmlFor="licence" className="text-sm font-semibold text-gray-600">
                Licence Number
              </label>
              <input
                id="licence"
                type="text"
                required
                value={licence}
                onChange={(e) => setLicence(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
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
              autoComplete="new-password"
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
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" state={{ role }} className="font-semibold text-blue-600 hover:text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm; 