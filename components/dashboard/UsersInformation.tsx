import React, { useEffect, useState } from 'react';
import StyledButton from '../../atoms/common/StyledButton';
import { DashboardUser } from '../../types';
import UserCard from '../../atoms/dashboard/UserCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
const UsersInformation = () => {
  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  ;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
          method: 'GET',
          credentials: 'include',

          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        const users: DashboardUser[] = data;
        setUsers(users);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <div className="mt-4 text-gray-700">Loading...</div>
      ) : error ? (
        <div className="flex flex-col items-center">
          <div className="mt-2 text-red-500">{error}</div>
          <StyledButton
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 w-full max-w-md"
            variant="primary"
            label="Reload Users"
          />
        </div>
      ) : users.length > 0 ? (
        <div className="mt-4 w-full">
          {users.map((user) => (
            <UserCard
              key={user.id}
              fullName={user.full_name}
              email={user.email}
              signedUp={user.created_at}
              id={user.id}
            />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-700">No users found.</p>
      )}
    </div>
  );
};

export default UsersInformation;
