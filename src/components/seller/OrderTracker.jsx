import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatusBadge = ({ status }) => {
    const statusClasses = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Shipped: 'bg-blue-100 text-blue-800',
        Delivered: 'bg-green-100 text-green-800',
    };
    return (
        <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}
        >
            {status}
        </span>
    );
};

const OrderTracker = () => {
    const [orders, setOrders] = useState([]);

    const sellerToken = localStorage.getItem('sellerToken') || '';

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('/api/orders/seller', {
                    headers: { Authorization: `Bearer ${sellerToken}` },
                });
                // include only paid or beyond
                setOrders(res.data.filter((o) => !['pending'].includes(o.status)));
            } catch (err) {
                console.error(err);
            }
        };
        if (sellerToken) fetchOrders();
    }, [sellerToken]);






    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.patch(`/api/orders/${orderId}/status`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${sellerToken}` },
            });
            setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)));
        } catch (err) {
            alert('Failed to update');
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Current Orders</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id.slice(-6).toUpperCase()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.buyerId ? order.buyerId.slice(-6) : 'Buyer'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`₹${order.grandTotal}`}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <StatusBadge status={order.status} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {/* Dropdown to change status */}
                                    <select
                                        defaultValue=""
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className="text-indigo-600 hover:text-indigo-900 border-gray-300 rounded"
                                    >
                                        <option value="" disabled>Update Status</option>
                                        <option value="shipped">Shipped</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderTracker; 