import React from 'react';
import DashboardHeader from '../components/seller/DashboardHeader'; // Reusing for now
import AdminStats from '../components/admin/AdminStats';
import UserTable from '../components/admin/UserTable';

const AdminDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <DashboardHeader />
      <main className="p-4 sm:p-6 md:p-8">
        <AdminStats />
        <div className="mt-8">
          <UserTable />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 