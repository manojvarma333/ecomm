import React, { useState } from 'react';

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
    const [orders, setOrders] = useState([
        { id: 'ORD001', customer: 'Ramesh Kumar', date: '2024-03-10', total: '₹1250', status: 'Pending' },
        { id: 'ORD002', customer: 'Sunita Devi', date: '2024-03-11', total: '₹850', status: 'Shipped' },
        { id: 'ORD003', customer: 'Amit Singh', date: '2024-03-12', total: '₹2100', status: 'Delivered' },
        { id: 'ORD004', customer: 'Priya Sharma', date: '2024-03-13', total: '₹500', status: 'Pending' },
    ]);

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
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
                            <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <StatusBadge status={order.status} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {/* Dropdown to change status */}
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className="text-indigo-600 hover:text-indigo-900 border-gray-300 rounded"
                                    >
                                        <option>Pending</option>
                                        <option>Shipped</option>
                                        <option>Delivered</option>
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