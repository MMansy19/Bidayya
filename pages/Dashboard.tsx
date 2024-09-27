import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/sidebar/DashboardSidebar';
import Header from '../components/header/Header';
import useCheckAuthentication from '../hooks/useCheckAuthentication';
import { useExpandHover } from '../hooks/ExpandHoverContext';

const Dashboard: React.FC = () => {
  const { expanded, hover } = useExpandHover();
  useCheckAuthentication();
  return (
    <div className="flex h-screen">
      <Header />
      <DashboardSidebar />
      <div
        className={`my-24 ml-12 flex-1 transition-all duration-300 ${
          expanded || hover ? 'sm:ml-72' : 'sm:ml-24'
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
