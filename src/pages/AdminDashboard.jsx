import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import AdminStats from '../components/admin/AdminStats';
import UserTable from '../components/admin/UserTable';

const AdminDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('isAdminAuthenticated') !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);
  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminHeader />
      <main className="p-4 sm:p-6 md:p-8">
        <AdminStats />
        <div className="mt-6">
          <button
            onClick={() => navigate('/admin/orders')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Manage Shipped Orders
          </button>
        </div>
        <div className="mt-8">
          <UserTable />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 