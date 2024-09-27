import { useState, useEffect } from 'react';
import StyledButton from '../../atoms/common/StyledButton';
import InputField from './InputField';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { changeEmail } from '../../store/UserSlice';

const ChangeEmail = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const [email, setEmail] = useState(user?.email || '');
  const [username, setUsername] = useState(user?.username || '');
  const [otp, setOtp] = useState('');

  const [showEmailInput, setShowEmailInput] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const [emailChanged, setEmailChanged] = useState(false);

  const [emailExists, setEmailExists] = useState(false);

  const dispatch = useDispatch();

  const handleChangeEmail = () => setShowEmailInput(true);
  const handleSendOtp = async () => {
    checkEmailExists();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/send-verification-otp-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            name: username,
          }),
        }
      );
      if (response.ok) {
        setIsOtpSent(true);
      } else {
        const errorData = await response.json();
        console.error('Failed to send OTP:', errorData);
      }
    } catch (error: any) {
      console.error('Error sending OTP:', error);
    }
  };
  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/current-user/verify-otp-and-change-email`,
        {
          method: 'PATCH',
          credentials: 'include',

          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newEmail: email,
            otp,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log('Email changed:', data);
        dispatch(changeEmail({ email }));
        setShowEmailInput(false);
        setEmailChanged(true);
        setIsOtpSent(false);
      } else {
        const errorData = await response.json();
        console.error('Failed to change email:', errorData);
      }
    } catch (error: any) {
      console.error('Error changing email:', error);
    }
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setUsername(user.username || '');
    }
  }, [user]);

  useEffect(() => {
    if (emailChanged) {
      const tID = setTimeout(() => {
        setEmailChanged(false);
      }, 3000);
      return () => {
        clearTimeout(tID);
      };
    }
  }, [emailChanged]);

  const checkEmailExists = async () => {
    if (email === user?.email) {
      setEmailExists(false);
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${email}/exists`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEmailExists(data.exists);
      } else {
        const errorData = await response.json();
        console.error('Failed to check email exists', errorData);
      }
    } catch (error: any) {
      console.error('Error checking email exists:', error);
    }
  };
  return (
    <div className="flex flex-col items-start gap-3">
      <h1 className="text-xl font-semibold">Your email address</h1>
      {emailChanged && (
        <div className="text-light-blue">Email Changed Successfully</div>
      )}
      {!showEmailInput ? (
        <>
          <p className="text-sm">{email}</p>
          <StyledButton
            className="border-2 border-black uppercase hover:border-white"
            type="button"
            variant="secondary"
            label="Change Email"
            onClick={handleChangeEmail}
          />
        </>
      ) : (
        <div className="flex flex-col space-y-4">
          <InputField
            placeholder="Your email"
            id="newEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={checkEmailExists}
          />
          {emailExists && (
            <div className="text-start text-red-500">Email already exists</div>
          )}
          {isOtpSent && (
            <>
              <div className="text-light-blue">
                We have sent you email with a six- character code. Please enter
                it here.
              </div>
              <InputField
                placeholder="Enter OTP"
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
            </>
          )}
          <div className="flex justify-end">
            <StyledButton
              className="border-2 border-black uppercase hover:border-white"
              type="button"
              variant="secondary"
              label={isOtpSent ? 'Save' : 'Continue'}
              onClick={isOtpSent ? handleSaveChanges : handleSendOtp}
              disabled={isOtpSent ? !otp : email === user?.email || emailExists}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeEmail;
