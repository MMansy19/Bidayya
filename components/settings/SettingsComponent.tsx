import React, { useState } from 'react';
import Tabs from '../../atoms/common/Tabs';
import { Outlet, useNavigate } from 'react-router-dom';
import { useExpandHover } from '../../hooks/ExpandHoverContext';

const SettingsComponent: React.FC = () => {
  const { expanded } = useExpandHover();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('account');

  const handleTabChange = (tab: { label: string; route: string }) => {
    setActiveTab(tab.label.toLowerCase());
    navigate(tab.route);
  };

  return (
    <div
      className={`my-0 transition-all duration-300 lg:mx-8 ${
        expanded ? 'mx-0' : 'mx-1'
      }`}
    >
      <header className="mt-8 flex flex-col items-start justify-between gap-3 lg:flex-row">
        <div className="flex flex-col items-start gap-3 lg:gap-4">
          <h1 className="text-2xl font-bold sm:text-4xl">Settings</h1>
          <p className="text-xs font-normal md:text-base">
            Control over your Bidayya account and all communications.
          </p>
        </div>
      </header>
      <Tabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabs={[
          { label: 'Account', route: 'account' },
          { label: 'Notifications', route: 'notifications' },
        ]}
      />
      <main className="flex-grow md:p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default SettingsComponent;
