import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelectorModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const handleRoleSelection = (role) => {
    onClose();
    if (role === 'admin') {
      navigate('/admin/login', { state: { role } });
    } else {
      navigate('/login', { state: { role } });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative mx-auto p-8 border w-96 shadow-lg rounded-xl bg-white transition-opacity-scale-95">
        <h3 className="text-2xl font-bold text-center mb-6">Select Your Role</h3>
        <div className="space-y-4">
          <button
            onClick={() => handleRoleSelection('admin')}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
          >
            Admin
          </button>
          <button
            onClick={() => handleRoleSelection('buyer')}
            className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition"
          >
            Buyer
          </button>
          <button
            onClick={() => handleRoleSelection('seller')}
            className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold text-lg hover:bg-purple-700 transition"
          >
            Seller
          </button>
        </div>
        <div className="absolute top-0 right-0 pt-4 pr-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectorModal; 