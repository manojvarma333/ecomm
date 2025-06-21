import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';

const SellerOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const sellerToken = localStorage.getItem('sellerToken') || '';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders/seller', {
          headers: { Authorization: `Bearer ${sellerToken}` },
        });
        setOrders(res.data.filter((o) => o.status !== 'pending'));
      } catch (err) {
        console.error(err);
      }
    };
    if (sellerToken) fetchOrders();
  }, [sellerToken]);

  const updateStatus = async (orderId, status) => {
    try {
      const res = await axios.patch(`/api/orders/${orderId}/status`, { status }, {
        headers: { Authorization: `Bearer ${sellerToken}` },
      });
      setOrders((prev) => prev.map((o) => (o._id === orderId ? res.data : o)));
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="container mx-auto p-4 sm:p-6">
        <h1 className="text-2xl font-bold mb-4">Orders for Your Products</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Order #{order._id}</span>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="pending">pending</option>
                  <option value="shipped">shipped</option>
                  <option value="transferred" disabled>transferred (admin)</option>
                  <option value="delivered">delivered</option>
                </select>
              </div>
              <ul className="pl-4 list-disc text-sm text-gray-700">
                {order.items.map((it) => (
                  <li key={it.productId}>{it.qty} x {it.name} – ₹{it.price}</li>
                ))}
              </ul>
              <p className="text-right font-semibold mt-2">Total: ₹{order.total}</p>
            </div>
          ))}
          {orders.length === 0 && <p>No orders yet.</p>}
        </div>
      </main>
    </div>
  );
};

export default SellerOrdersPage;
