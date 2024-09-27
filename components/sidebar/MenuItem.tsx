import React from 'react';
interface MenuItemProps {
  label: string;
  icon: string;
  expanded: boolean;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  icon,
  expanded,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`my-1 flex w-full cursor-pointer items-center space-x-4 rounded-lg hover:bg-slate-400 ${
        expanded ? 'py-2 pl-4' : 'justify-center py-2 sm:px-2 md:p-2 md:px-4'
      }`}
    >
      <i className={`${icon} text-xl text-white`} />
      {expanded && <span className="text-white">{label}</span>}
    </div>
  );
};

export default MenuItem;
