import React, { useEffect, useState } from 'react';
import StyledButton from '../common/StyledButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Dialog } from 'primereact/dialog';
import InputField from '../../components/settings/InputField';
import { emailRegex } from '../../constants';

interface UserCardProps {
  fullName: string;
  email: string;
  signedUp: string;
  id: number;
}

const UserCard: React.FC<UserCardProps> = ({
  fullName,
  email,
  signedUp,
  id,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [newEmail, setNewEmail] = useState(email);
  const [newPassword, setNewPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };
  const handleEdit = () => {
    setShowEditDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${id}`,
        {
          method: 'DELETE',
          credentials: 'include',

          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reason: deleteReason }),
        }
      );

      if (response.ok) {
        setShowDeleteDialog(false);
        console.log('User deleted');
      } else {
        console.error('Failed to delete user');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const confirmEdit = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${id}`,
        {
          method: 'PATCH',
          credentials: 'include',

          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: newEmail, password: newPassword }),
        }
      );

      if (response.ok) {
        setShowEditDialog(false);
        console.log('User updated');
      } else {
        const errorData = await response.json();
        console.error('Failed to update user', errorData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkEmail = async () => {
    if (newEmail === '' || email === newEmail) {
      setEmailError('');
      return;
    }
    if (!emailRegex.test(newEmail)) {
      setEmailError('Invalid email');
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${newEmail}/exists`,
        {
          method: 'GET',
          credentials: 'include',

          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.exists) {
          setEmailError('Email already exists');
        } else {
          setEmailError('');
        }
      } else {
        console.error('Error checking email:', response.statusText);
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  useEffect(() => {
    checkEmail();
  }, [newEmail]);

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setDeleteReason('');
  };

  const cancelEdit = () => {
    setShowEditDialog(false);
  };

  return (
    <div className="mb-4 w-full rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg lg:min-w-[300px]">
      <div className="flex w-full flex-col rounded-lg bg-white px-4 py-4 shadow-sm transition-shadow duration-300 hover:shadow-lg lg:flex-row lg:items-center">
        {/* Name and Avatar Section */}
        <div className="flex items-center gap-4 md:w-1/3">
          <img
            src="https://primefaces.org/cdn/primereact/images/organization/walter.jpg"
            alt="user avatar"
            className="h-8 rounded-full object-cover lg:h-10"
          />
          <h3 className="text-base font-semibold lg:text-lg">{fullName}</h3>
        </div>

        {/* Email Section */}
        <div className="md:w-1/3">
          <p className="text-xs text-gray-600 md:text-left lg:text-sm">
            <span className="underline">{email}</span>
          </p>
        </div>

        {/* Sign-up Date Section */}
        <div className="md:w-1/3">
          <p className="text-xs text-gray-500 md:text-left lg:text-sm">
            {formatDate(signedUp.toString())}
          </p>
        </div>

        {/* Buttons Section */}
        <div className="mt-2 flex items-center gap-2 lg:mt-0">
          <StyledButton
            label="Edit"
            variant="secondaryOutline"
            onClick={handleEdit}
            className="w-full"
          />
          <StyledButton
            label="Delete"
            variant="secondaryOutline"
            onClick={handleDelete}
            className="w-full"
          />
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Delete Confirmation Dialog */}
      <Dialog
        header="Confirm Deletion"
        visible={showDeleteDialog}
        style={{
          width: '90vw',
          maxWidth: '600px',
          padding: '.2rem',
        }}
        onHide={cancelDelete}
        draggable={false}
      >
        <h2 className="mb-4 text-lg font-semibold">Delete: {fullName}</h2>
        <p className="mb-4">Are you sure you want to delete this user?</p>
        <textarea
          value={deleteReason}
          onChange={(e) => setDeleteReason(e.target.value)}
          placeholder="Reason for deleting (optional)"
          className="mb-4 w-full rounded border p-2"
        />
        <div className="mt-6 flex justify-end gap-4">
          <StyledButton
            label="Confirm"
            variant="danger"
            onClick={confirmDelete}
          />
          <StyledButton
            label="Cancel"
            variant="secondaryOutline"
            onClick={cancelDelete}
          />
        </div>
      </Dialog>
      {/* Edit User Dialog */}

      <Dialog
        header="Edit User's Data"
        visible={showEditDialog}
        style={{
          width: '90vw',
          maxWidth: '900px',
          padding: '.2rem',
        }}
        onHide={cancelEdit}
        draggable={false}
      >
        <div className="flex w-full flex-col items-start gap-4">
          <div className="text-light-blue">
            Change user's email or leave it unchanged
          </div>
          <InputField
            placeholder="New Email"
            id="newEmail"
            type="text"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
          />
          {emailError !== '' && (
            <div className="text-red-500">{emailError}</div>
          )}
          <div className="text-light-blue">
            Change user's password or leave it blank
          </div>
          <InputField
            placeholder="New Password"
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <StyledButton
            label="Confirm"
            variant="primary"
            disabled={
              (newEmail === email && !newPassword) ||
              (newEmail !== '' && emailError !== '')
            }
            onClick={confirmEdit}
          />
          <StyledButton
            label="Cancel"
            variant="secondaryOutline"
            onClick={cancelEdit}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default UserCard;
