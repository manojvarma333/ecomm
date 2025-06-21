import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { Link } from 'react-router-dom';
import RoleSelectorModal from '../auth/RoleSelectorModal';

const Navbar = () => {
  const { items } = useCart();
  useEffect(() => {
    const badge = document.getElementById('cart-count');
    if (badge) badge.textContent = items.length;
  }, [items]);
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
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/cart" className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00-.15.55c0 .83.67 1.5 1.5 1.5h12.5M16 16a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1" id="cart-count">0</span>
              </Link>
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