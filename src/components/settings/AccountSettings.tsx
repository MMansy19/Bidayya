import React, { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import InputField from './InputField';
import StyledButton from '../../atoms/common/StyledButton';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import { useDeleteAccount } from '../../hooks/DeleteAccountContext';
const AccountSettings: React.FC = () => {
  const { setDeleteAccount } = useDeleteAccount();
  const [message, setMessage] = useState<string>('');

  return (
    <div className="container flex flex-col items-start gap-6">
      {message && <div className="mt-2 text-red-500">{message}</div>}
      <ChangeEmail />

      <div className="flex flex-col items-start gap-3">
        <h1 className="text-xl font-semibold">Phone Verification</h1>
        <p className="text-start text-sm">
          Your account is not verified. Verifying your account with a phone
          number allows you to do more on Bidayya and helps prevent spam and
          other abuse.
        </p>
        <StyledButton
          className="border-2 border-black uppercase hover:border-white"
          type="button"
          variant="secondary"
          label="Phone Verify"
        />
      </div>

      <ChangePassword />
      <hr className="border-b-2 border-black" />
      <div className="container flex flex-col items-start gap-3 py-4">
        <h1 className="text-xl font-semibold">Delete Account</h1>
        <p className="text-start text-sm">
          Permanently delete your Bidayya account and all of your content.
        </p>
        <StyledButton
          className="border-2 border-black uppercase hover:border-white"
          type="button"
          variant="danger"
          label="Delete Account"
          onClick={() => setDeleteAccount(true)}
        />
      </div>
    </div>
  );
};

export default memo(AccountSettings);
