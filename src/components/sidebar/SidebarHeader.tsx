import React from 'react';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
interface SidebarHeaderProps {
  toggleSidebar: () => void;
  expanded: boolean;
}
const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  toggleSidebar,
  expanded,
}) => {
  return (
    <div
      className={`flex items-center justify-between py-4 mb-4${
        expanded ? 'py-2 pl-4' : 'justify-center py-2 sm:px-2 md:p-2 md:px-4'
      }`}
    >
      {expanded && (
        <h2 className="text-2xl text-white">
          <Link to="/">Home</Link>
        </h2>
      )}
      <Button
        icon={`pi ${expanded ? 'pi-chevron-left' : 'pi-chevron-right'}`}
        className="p-button-text p-button-plain text-white"
        onClick={toggleSidebar}
      />
    </div>
  );
};

export default SidebarHeader;
