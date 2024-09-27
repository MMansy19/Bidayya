import React, { ReactNode } from 'react';
import Header from './header/Header';
import SidebarComponent from './sidebar/SidebarComponent';
import { useExpandHover } from '../hooks/ExpandHoverContext';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { expanded, hover } = useExpandHover();
  return (
    <div className="flex">
      <Header />
      <SidebarComponent />
      <div
        className={`ml-12 flex-1 transition-all duration-300 ${
          expanded || hover ? 'sm:ml-64' : 'sm:ml-20'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
