import SidebarHeader from './SidebarHeader';
import MenuItem from './MenuItem';
import { useExpandHover } from '../../hooks/ExpandHoverContext';

const DashboardSidebar: React.FC = () => {
  const { expanded, setExpanded, hover, setHover } = useExpandHover();
  const toggleSidebar = () => {
    setExpanded(!expanded);
    setHover(false);
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const menuItems = [
    {
      label: 'New Competitions',
      icon: 'pi pi-plus',
      id: 0,
      route: '/dashboard/new',
    },
    {
      label: 'Under Review',
      icon: 'pi pi-eye',
      id: 2,
      route: '/dashboard/under-review',
    },
    {
      label: 'Approved Competitions',
      icon: 'pi pi-check',
      id: 1,

      route: '/dashboard/approved',
    },

    {
      label: 'Declined Competitions',
      icon: 'pi pi-times',
      id: 3,
      route: '/dashboard/declined',
    },
    {
      label: 'Users Information',
      icon: 'pi pi-users',
      id: 4,
      route: '/dashboard/users-information',
    },
  ];

  return (
    <div className="fixed top-0 z-10 h-screen">
      <div
        onMouseLeave={handleMouseLeave}
        className={`p-sidebar-sm fixed h-full bg-blue-gradient transition-all duration-300 md:relative ${
          expanded || hover ? 'w-64' : 'md:w-20'
        }`}
        style={{
          left: 0,
        }}
      >
        <SidebarHeader
          toggleSidebar={toggleSidebar}
          expanded={expanded || hover}
        />
        <hr className="border-gray-600" />
        <div onMouseEnter={handleMouseEnter}>
          {menuItems.map((item, index) => (
            <div key={item.id}>
              <MenuItem
                label={item.label}
                icon={item.icon}
                expanded={expanded || hover}
                onClick={() => (window.location.href = item.route)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1">{/* Main content goes here */}</div>
    </div>
  );
};

export default DashboardSidebar;
