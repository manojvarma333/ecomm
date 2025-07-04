import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatsCard from '../common/StatsCard';

const TotalUsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M12 14a4 4 0 100-8 4 4 0 000 8z" />
    </svg>
);

const TotalProductsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const TotalOrdersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h10a1 1 0 001-1zM3 10h10" />
    </svg>
);

const AdminStats = () => {
    const [data, setData] = useState(null);
    const token = localStorage.getItem('adminToken') || '';

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } });
                setData(res.data);
            } catch (err) { console.error(err); }
        };
        if (token) fetchStats();
    }, [token]);

    if (!data) return <div className="h-24" />;

    const stats = [
        { title: 'Total Users', value: data.totalUsers, icon: <TotalUsersIcon /> },
        { title: 'Total Products', value: data.totalProducts, icon: <TotalProductsIcon /> },
        { title: 'Total Orders', value: data.totalOrders, icon: <TotalOrdersIcon /> }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {stats.map((s, i) => (<StatsCard key={i} title={s.title} value={s.value} icon={s.icon} />))}
        </div>
    );
};

export default AdminStats;