import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you'd clear tokens and state
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-gray-800">Seller Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 