import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RoleSelectorModal from '../auth/RoleSelectorModal';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-gray-800">
                SHG E-Commerce
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  onClick={handleOpenModal}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Login / Signup
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <RoleSelectorModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Navbar; 