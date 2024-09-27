import { useEffect, useState } from 'react';
import FormField from '../../atoms/auth/FormField';
import StyledButton from '../../atoms/common/StyledButton';

import {
  passwordCapitalLetterRegex,
  passwordLengthRegex,
  passwordNumberRegex,
  passwordRegex,
  passwordSmallLetterRegex,
  passwordSpecialCharacterRegex,
} from '../../constants';

const NewPassword = ({
  message,
  setMessage,
  resetToken,
}: {
  message: string;
  setMessage: (message: string) => void;
  resetToken: string;
}) => {
  // const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [passwordResetted, setPasswordResetted] = useState<boolean>(false);

  const [passwordCapitalLetter, setPasswordCapitalLetter] =
    useState<boolean>(false);
  const [passwordSmallLetter, setPasswordSmallLetter] =
    useState<boolean>(false);
  const [passwordNumber, setPasswordNumber] = useState<boolean>(false);
  const [passwordSpecialCharacter, setPasswordSpecialCharacter] =
    useState<boolean>(false);
  const [passwordLength, setPasswordLength] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  useEffect(() => {
    setPasswordCapitalLetter(passwordCapitalLetterRegex.test(password));
    setPasswordSmallLetter(passwordSmallLetterRegex.test(password));
    setPasswordNumber(passwordNumberRegex.test(password));
    setPasswordSpecialCharacter(passwordSpecialCharacterRegex.test(password));
    setPasswordLength(passwordLengthRegex.test(password));
  }, [password]);

  useEffect(() => {
    setPasswordValid(
      passwordSmallLetter &&
        passwordCapitalLetter &&
        passwordNumber &&
        passwordSpecialCharacter &&
        passwordLength
    );
  }, [
    passwordSmallLetter,
    passwordCapitalLetter,
    passwordNumber,
    passwordSpecialCharacter,
    passwordLength,
  ]);

  useEffect(() => {
    if (passwordResetted) {
      const timeoutId = setTimeout(() => {
        window.location.href = '/signin';
      }, 5000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [passwordResetted]);

  const handleResetPassword = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resetToken}`,
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      if (response.ok) {
        setMessage(
          'Password reset successfully! Please sign in with your new password.'
        );
        setPasswordResetted(true);
      } else {
        const errorData = await response.json();
        console.error('Password reset failed', errorData);
      }
    } catch (error: any) {
      console.error('Error resetting password:', error);
      setMessage(
        'An error occurred while resetting password. Please try again.'
      );
    }
  };
  return (
    <>
      <div className="mt-2 text-2xl font-medium text-black md:text-3xl">
        Choose a new password
      </div>

      <div className="mt-4 text-start text-light-blue">{message}</div>
      <form className="mt-2 w-[90%]">
        <FormField
          label="Enter new password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="md:w-80"
          forgetPassword={false}
        />
        <div className="mb-2">
          <div className="flex items-center">
            <span
              className={`${
                passwordCapitalLetter ? 'text-green-500' : 'text-red-500'
              }`}
            >
              &#10003;
            </span>
            <span className="ml-1">Capital letter</span>
          </div>
          <div className="flex items-center">
            <span
              className={`${
                passwordSmallLetter ? 'text-green-500' : 'text-red-500'
              }`}
            >
              &#10003;
            </span>
            <span className="ml-1">Small letter</span>
          </div>
          <div className="flex items-center">
            <span
              className={`${passwordNumber ? 'text-green-500' : 'text-red-500'}`}
            >
              &#10003;
            </span>
            <span className="ml-1">Number</span>
          </div>
          <div className="flex items-center">
            <span
              className={`${
                passwordSpecialCharacter ? 'text-green-500' : 'text-red-500'
              }`}
            >
              &#10003;
            </span>
            <span className="ml-1">Special !@#$%^&()</span>
          </div>
          <div className="flex items-center">
            <span
              className={`${passwordLength ? 'text-green-500' : 'text-red-500'}`}
            >
              &#10003;
            </span>
            <span className="ml-1">At least 8 characters long</span>
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-16">
          <StyledButton
            type="button"
            onClick={handleResetPassword}
            disabled={!passwordValid}
            variant="primary"
            label="Next"
          />
        </div>
      </form>
    </>
  );
};

export default NewPassword;
