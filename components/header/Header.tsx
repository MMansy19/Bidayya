import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import StyledButton from '../../atoms/common/StyledButton';
import SearchBar from './SearchBar';
import AvatarComponent from './AvatarComponent';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../store/UserSlice';
import { RootState } from '../../store';

const Header: React.FC = () => {
  const menu = useRef<Menu | null>(null);
  const dispatch = useDispatch();

  const isSignedIn = useSelector((state: RootState) => state.user.user);

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
      } else {
        console.log('Error while signing out' + response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    {
      items: [
        {
          label: 'Search',
          icon: 'pi pi-search',
          command: () => {
            const searchBar = document.getElementById('mobileSearchBar');
            if (searchBar) {
              searchBar.focus();
            }
          },
        },
        {
          label: isSignedIn ? 'Logout' : 'Login',
          icon: isSignedIn ? 'pi pi-sign-out' : 'pi pi-sign-in',
          command: () => {
            if (isSignedIn) {
              handleSignout();
            } else {
              // Redirect to login page
              window.location.href = '/signin';
            }
          },
        },
        {
          label: 'Sign up',
          icon: 'pi pi-user-plus',
          command: () => {
            window.location.href = '/signup';
          },
          visible: !isSignedIn,
        },
        {
          label: 'Profile',
          icon: 'pi pi-user',
          command: () => {
            const avatarButton = document.getElementById('avatarButton');
            if (avatarButton) {
              avatarButton.click();
            }
          },
          visible: isSignedIn,
        },
      ],
    },
  ];

  return (
    <header className="absolute right-0 top-0 z-10 flex items-center bg-white px-4 pt-4 lg:px-7 lg:pt-10">
      <div className="ml-auto flex items-center">
        {/* Search Bar */}
        <div className="mr-4 hidden flex-grow lg:flex">
          <SearchBar placeholder="Search Product" />
        </div>

        {/* Mobile Search Bar */}
        <div className="ml-auto flex px-4 py-2 lg:hidden">
          <SearchBar placeholder="Search Product" />
        </div>

        {/* Mobile Menu Button */}
        <div className="ml-auto flex lg:hidden">
          <Button
            icon="pi pi-bars"
            onClick={(event) => {
              if (menu.current) {
                menu.current.toggle(event);
              }
            }}
            aria-controls="popup_menu"
            aria-haspopup
            className="p-button-text"
          />
          <Menu
            className="mx-auto"
            model={menuItems}
            popup
            ref={menu}
            id="popup_menu"
          />
        </div>

        {/* Desktop Buttons */}
        <div className="ml-auto hidden items-center space-x-4 lg:flex">
          {isSignedIn ? (
            <AvatarComponent />
          ) : (
            <>
              <Link to="/signin">
                <StyledButton type="button" variant="secondary" label="Login" />
              </Link>
              <Link to="/signup">
                <StyledButton type="button" variant="primary" label="Sign up" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
