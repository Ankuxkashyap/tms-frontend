import React from 'react';
import Sidebar from '@/components/Sidebar';


const Dashboard = () => {
  return (
    <div className="h-screen flex flex-row bg-gray-950 text-white">
      <Sidebar  />
      <div className="flex-1 ml-80 overflow-y-hidden p-8">
        <h1 className="text-3xl font-bold mb-6">My Dashboard </h1>
      </div>
    </div>
  );
};



export default Dashboard;
