import React, { useEffect, useState } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';

const steps = ['pending', 'paid', 'shipped', 'transferred', 'delivered'];
// Placeholder navbar component, adjust path if you have one
import Navbar from '../components/common/Navbar';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const buyerToken = localStorage.getItem('buyerToken') || '';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders/mine', {
          headers: { Authorization: `Bearer ${buyerToken}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (buyerToken) {
      fetchOrders();
      const id = setInterval(fetchOrders, 15000); // refresh every 15s
      return () => clearInterval(id);
    }
  }, [buyerToken]);

  const downloadInvoice = async (id) => {
    try {
      const { data } = await axios.get(`/api/invoice/${id}`, {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${buyerToken}` },
      });
      fileDownload(data, `invoice-${id}.pdf`);
    } catch (err) {
      alert('Unable to download invoice');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="container mx-auto p-4 sm:p-6">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Order #{order._id}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 capitalize">Status: {order.status}</span>
                  <button
                    onClick={() => downloadInvoice(order._id)}
                    className="text-blue-600 underline text-sm"
                  >
                    Invoice
                  </button>
                </div>
                
              </div>
              
              {/* Tracking bar */}
              <div className="flex items-center mb-3">
                {steps.map((s, idx) => {
                  const active = steps.indexOf(order.status) >= idx;
                  return (
                    <React.Fragment key={s}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${active ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                        {idx + 1}
                      </div>
                      {idx < steps.length - 1 && (
                        <div className={`flex-1 h-1 ${active && steps.indexOf(order.status) > idx ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              <ul className="pl-4 list-disc text-sm text-gray-700">
                {order.items.map((it) => (
                  <li key={it.productId}>{it.qty} x {it.name} – ₹{it.price}</li>
                ))}
              </ul>
              <p className="text-right font-semibold mt-2">Grand Total: ₹{order.grandTotal}</p>
            </div>
          ))}
          {orders.length === 0 && <p>No orders yet.</p>}
        </div>
      </main>
    </div>
  );
};

export default OrderHistoryPage;
