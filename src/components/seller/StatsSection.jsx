import React from 'react';
import StatsCard from '../common/StatsCard';

const MonthlyIncomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 16v-1m0-1v-1m0-1v-1m0-1v-1m0-1v-1m0-1v-1m0-1v-1m0-1v-1m0-1v-1m0-1V9" />
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

const TotalItemsSoldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
);


const StatsSection = () => {
    // Mock data
    const stats = [
        { title: 'Monthly Income', value: '₹5,40,000', icon: <MonthlyIncomeIcon /> },
        { title: 'Total Products', value: '82', icon: <TotalProductsIcon /> },
        { title: 'Total Orders', value: '1,234', icon: <TotalOrdersIcon /> },
        { title: 'Total Items Sold', value: '5,678', icon: <TotalItemsSoldIcon /> },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
                <StatsCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
            ))}
        </div>
    );
};

export default StatsSection; 