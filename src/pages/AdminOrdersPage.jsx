import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('adminToken') || '';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders/shipped', {
          headers: { Authorization: `Bearer ${token}` },
        });
        // filter shipped only
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (token) fetchOrders();
  }, [token]);

  const markDelivered = async (id) => {
    try {
      const { data } = await axios.patch(
        `/api/orders/${id}/status`,
        { status: 'delivered' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      alert('Failed');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="container mx-auto p-4 sm:p-6">
        <h1 className="text-2xl font-bold mb-4">Orders Awaiting Delivery Confirmation</h1>
        {orders.map((order) => (
          <div key={order._id} className="bg-white shadow rounded-lg p-4 mb-3">
            <p className="font-semibold mb-2">Order #{order._id}</p>
            <button
              onClick={() => markDelivered(order._id)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Mark Delivered
            </button>
          </div>
        ))}
        {orders.length === 0 && <p>No shipped orders to confirm.</p>}
      </main>
    </div>
  );
};

export default AdminOrdersPage;
