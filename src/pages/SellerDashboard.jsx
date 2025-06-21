import React from 'react';
import DashboardHeader from '../components/seller/DashboardHeader';
import StatsSection from '../components/seller/StatsSection';
import ProductManager from '../components/seller/ProductManager';
import OrderTracker from '../components/seller/OrderTracker';

const SellerDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <DashboardHeader />
      <main className="p-4 sm:p-6 md:p-8">
        <StatsSection />
        <div className="mt-8">
          <ProductManager />
        </div>
        <div className="mt-8">
          <OrderTracker />
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard; 