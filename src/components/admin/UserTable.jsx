import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoleBadge = ({ role }) => {
    const roleClasses = {
        Buyer: 'bg-green-100 text-green-800',
        Seller: 'bg-purple-100 text-purple-800',
    };
    return (
        <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${roleClasses[role]}`}
        >
            {role}
        </span>
    );
};

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('adminToken') || '';

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('adminToken');
            const res = await axios.get('/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(res.data);
        })();
    }, []);

    const handleVerification = async (userId) => {
        const token = localStorage.getItem('adminToken');
        await axios.patch(`/api/admin/users/${userId}/toggle-verify`, {}, { headers: { Authorization: `Bearer ${token}` } });
        setUsers(users.map(u => (u.id === userId ? { ...u, verified: !u.verified } : u)));
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">User Management</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <RoleBadge role={user.role} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {user.role === 'Seller' && (
                                        <span className={`text-xs font-semibold ${user.verified ? 'text-green-600' : 'text-red-600'}`}>
                                            {user.verified ? 'Verified' : 'Not Verified'}
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {user.role === 'Seller' && (
                                        <button
                                            onClick={() => handleVerification(user.id)}
                                            className={`px-3 py-1 rounded-full text-white text-xs ${user.verified ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}
                                        >
                                            {user.verified ? 'Un-verify' : 'Verify'}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable; 