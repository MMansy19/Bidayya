import SidebarHeader from './SidebarHeader';
import MenuItem from './MenuItem';
import { Link } from 'react-router-dom';
import { useExpandHover } from '../../hooks/ExpandHoverContext';

const SidebarComponent: React.FC = () => {
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
    { label: 'Home', icon: 'pi pi-home', path: '/' },
    { label: 'Competitions', icon: 'pi pi-cog', path: '/competitions' },
    { label: 'Discussions', icon: 'pi pi-comments', path: '/discussions' },
    { label: 'Your Work', icon: 'pi pi-briefcase', path: '/your-work' },
    { label: 'Learn', icon: 'pi pi-book', path: '/learn' },
    { label: 'Progression', icon: 'pi pi-chart-line', path: '/progression' },
    { label: 'User Ranking', icon: 'pi pi-star', path: '/user-ranking' },
    {
      label: 'Community Guidelines',
      icon: 'pi pi-info-circle',
      path: '/community-guidelines',
    },
  ];

  return (
    <div className="fixed z-10 h-screen">
      <div
        onMouseLeave={handleMouseLeave}
        className={`p-sidebar-sm fixed h-full bg-blue-gradient transition-all duration-300 md:relative ${
          expanded || hover ? 'w-64' : 'md:w-20'
        }`}
        style={{
          left: 0, // Correctly setting the left position
        }}
      >
        <SidebarHeader
          toggleSidebar={toggleSidebar}
          expanded={expanded || hover}
        />
        <hr className="border-gray-600" />
        <div onMouseEnter={handleMouseEnter}>
          {menuItems.map((item, index) =>
            item.path ? ( // Ensure path is defined
              <Link key={index} to={item.path}>
                <MenuItem
                  label={item.label}
                  icon={item.icon}
                  expanded={expanded || hover}
                  onClick={() => console.log('Clicked')}
                />
              </Link>
            ) : null
          )}
        </div>
      </div>
      <div className="flex-1">{/* Main content goes here */}</div>
    </div>
  );
};

export default SidebarComponent;
