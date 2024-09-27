import React, { useEffect, useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import StyledButton from '../../atoms/common/StyledButton';
import { RootState } from '../../store'; // Import the type for the root state
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../store/UserSlice'; // Import the signOut action
import { FaCheckCircle } from 'react-icons/fa';
import { useExpandHover } from '../../hooks/ExpandHoverContext';

const DeleteAccount: React.FC = () => {
  const { expanded } = useExpandHover();
  const [message, setMessage] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [accountDeleted, setAccountDeleted] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/current-user/delete-account`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reasons: reason,
          }),
        }
      );

      if (response.ok) {
        setAccountDeleted(true);
      } else {
        setMessage('Failed to delete account. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setMessage(
        'An error occurred while deleting your account. Please try again.'
      );
    }
  };

  useEffect(() => {
    if (accountDeleted) {
      const timeoutId = setTimeout(() => {
        setAccountDeleted(false);
        dispatch(signOut());

        window.location.href = '/signin';
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [accountDeleted]);

  return (
    <div
      className={`container mt-32 flex flex-col items-start gap-6 transition-all duration-300 lg:mx-8 ${
        expanded ? 'mx-0' : 'mx-1'
      }`}
    >
      {message && <div className="mt-2 text-red-500">{message}</div>}
      {!accountDeleted && (
        <>
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-lg font-bold">
              Permanently delete your Bidayya account
            </h1>
          </div>
          <div className="flex flex-col items-start gap-1">
            <ul className="mb-4 flex list-disc flex-col gap-1">
              <p className="text-start text-sm">
                Warning: this cannot be undone! If you continue:
              </p>

              <li className="ml-4 text-start">
                you will lose access to all your notebooks, datasets, messages
                and other history on Bidayya
              </li>
              <li className="ml-4 text-start">
                you won’t be able to download datasets, contact other users, or
                join competitions
              </li>
            </ul>
            <p className="text-sm">
              Don't delete your account if you only want to change details like
              your display name.
            </p>
            <p className="text-sm">
              Edit your profile instead. Getting too many emails?{' '}
            </p>
            <p className="text-sm">
              Edit your notification settings. Having trouble changing something
              with your account (e.g. updating your email address)?{' '}
            </p>
            <p className="text-sm">Contact us and we'll help you! </p>
          </div>
          <div className="flex flex-col items-end justify-start gap-4">
            <InputTextarea
              rows={3}
              cols={30}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Provide a brief reason for deleting your account"
              className="bg-gray-100 p-4 md:w-[600px]"
            />
            <StyledButton
              className="border-2 border-black uppercase hover:border-white"
              type="button"
              variant="danger"
              label="Delete Account"
              onClick={handleDeleteAccount}
            />
          </div>
        </>
      )}
      {accountDeleted && (
        <div className="text-start">
          <FaCheckCircle className="text-6xl" />
          <div className="my-2 text-4xl font-bold">
            Your account has been deleted successfully
          </div>
          <div>Thanks for using our product!</div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
