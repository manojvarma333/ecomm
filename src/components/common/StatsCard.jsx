import React from 'react';

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="text-blue-500">
        {icon}
      </div>
    </div>
  );
};

export default StatsCard; 