import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useDispatch } from 'react-redux';
import { signOut } from '../../store/UserSlice';
import { useSelector } from 'react-redux';

const IMG_URL =
  // user.avatar ||
  'https://primefaces.org/cdn/primereact/images/organization/walter.jpg';
const AvatarComponent: React.FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.user);

  const name = user.full_name || 'User Name';
  const title = 'Graphic Designer';

  const handleSignout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/signout`,
        {
          method: 'POST',
          credentials: 'include',

          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        dispatch(signOut());
        setVisible(false);
      } else {
        console.log('Error while signing out' + response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    { label: 'Your Profile', icon: 'pi pi-user' },
    {
      label: 'Dashboard',
      icon: 'pi pi-th-large',
      onClick: () => {
        navigate('/dashboard');
        setVisible(false);
      },
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      onClick: () => {
        navigate('/settings');
        setVisible(false);
      },
    },
    {
      label: 'Sign out',
      icon: 'pi pi-sign-out',
      onClick: () => {
        handleSignout();
      },
    },
    { separator: true },
    {
      label: 'Notifications',
      icon: 'pi pi-bell',
      onClick: () => {
        navigate('/settings/notifications');
        setVisible(false);
      },
    },
  ];

  interface MenuItemProps {
    label: string;
    icon: string;
    onClick?: () => void;
    separator?: boolean;
  }

  const MenuItem: React.FC<MenuItemProps> = ({ label, icon, onClick }) => (
    <div
      className="flex cursor-pointer items-center space-x-7 px-4 py-2 hover:bg-gray-200"
      onClick={onClick}
    >
      <i className={`${icon} text-primary-text`} />
      <span className="text-primary-text">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center justify-center">
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="p-sidebar-sm"
        position="right"
      >
        <div className="flex flex-col items-center gap-1">
          <Avatar image={IMG_URL} shape="circle" size="xlarge" />
          <div className="mt-2 text-xl font-bold text-primary-text">{name}</div>
          <div className="text-lg text-primary-text">{title}</div>
        </div>
        <hr className="my-5" />
        {menuItems.map((item, index) =>
          item.separator ? (
            <hr className="mb-3 mt-6" key={index} />
          ) : (
            <MenuItem
              key={index}
              label={item.label || ''}
              icon={item.icon || ''}
              onClick={item.onClick}
            />
          )
        )}
      </Sidebar>

      <Button id="avatarButton" onClick={() => setVisible(true)}>
        <Avatar
          image={IMG_URL}
          className="p-overlay-badge"
          size="large"
          shape="circle"
        />
      </Button>
    </div>
  );
};

export default AvatarComponent;
