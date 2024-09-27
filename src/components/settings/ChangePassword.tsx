import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import StyledButton from '../../atoms/common/StyledButton';
import InputField from './InputField';

const ChangePassword = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [username, setUsername] = useState(user?.username || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [error, setError] = useState<string>('');

  const handleChangePassword = () => setShowPasswordInput(true);
  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/current-user/change-password`,
        {
          method: 'PATCH',
          credentials: 'include',

          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );
      if (response.ok) {
        // console.log('Password changed successfully');
        setPasswordChanged(true);
        setShowPasswordInput(false);
      } else {
        const errorData = await response.json();
        setError('Failed to change password: ' + errorData.message);
        console.error('Failed to change password:', errorData);
      }
    } catch (error: any) {
      console.error('Error changing password:', error);
    }
  };

  useEffect(() => {
    if (passwordChanged) {
      const timeoutId = setTimeout(() => {
        setPasswordChanged(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [passwordChanged]);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError('');
      }, 3000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [error]);
  return (
    <div className="flex flex-col items-start gap-3">
      <h1 className="text-xl font-semibold">Active Login</h1>
      <h2 className="text-md font-semibold">Bidayya Username</h2>
      {!showPasswordInput ? (
        <>
          <p className="text-sm">{username}</p>
          <StyledButton
            className="border-2 border-black uppercase hover:border-white"
            type="button"
            variant="secondary"
            label="Change Password"
            onClick={handleChangePassword}
          />
        </>
      ) : (
        <div className="flex flex-col items-start space-y-4">
          <InputField
            id="currentPassword"
            placeholder="Current password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <div className="flex flex-col gap-2 sm:flex-row">
            <InputField
              id="newPassword"
              placeholder="New password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <InputField
              id="confirmPassword"
              placeholder="Confirm new password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {confirmPassword !== newPassword &&
            confirmPassword !== '' &&
            newPassword !== '' && (
              <div className="text-red-500">Passwords do not match</div>
            )}
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex justify-end">
            <StyledButton
              className="border-2 border-black uppercase hover:border-white"
              type="button"
              variant="secondary"
              label="Save"
              onClick={handleSaveChanges}
              disabled={
                currentPassword === '' ||
                newPassword === '' ||
                confirmPassword === '' ||
                newPassword !== confirmPassword
              }
            />
          </div>
        </div>
      )}
      {passwordChanged && (
        <div className="text-light-blue">Password Changed Successfully</div>
      )}
    </div>
  );
};

export default ChangePassword;
