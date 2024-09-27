import { useState, useEffect } from 'react';
import useRecaptchaV3 from '../../hooks/useRecapthchaV3';

import {
  passwordCapitalLetterRegex,
  passwordLengthRegex,
  passwordNumberRegex,
  passwordSmallLetterRegex,
  passwordSpecialCharacterRegex,
} from '../../constants';

import FormField from '../../atoms/auth/FormField';
import StyledButton from '../../atoms/common/StyledButton';
import GoogleButton from '../../atoms/common/GoogleButton';

const InfoForm = ({
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  setMessage,
  setIsOtpSent,
}: {
  fullName: string;
  setFullName: (fullName: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  setMessage: (message: string) => void;
  setIsOtpSent: (isOtpSent: boolean) => void;
}) => {
  const [passwordCapitalLetter, setPasswordCapitalLetter] =
    useState<boolean>(false);
  const [passwordSmallLetter, setPasswordSmallLetter] =
    useState<boolean>(false);
  const [passwordNumber, setPasswordNumber] = useState<boolean>(false);
  const [passwordSpecialCharacter, setPasswordSpecialCharacter] =
    useState<boolean>(false);
  const [passwordLength, setPasswordLength] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  const [emailExists, setEmailExists] = useState<boolean>(false);

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

  const executeRecaptcha = useRecaptchaV3(process.env.REACT_APP_RECAPTCHA_KEY);

  const sendVerificationOtpEmail = async (
    email: string,
    fullName: string
  ): Promise<void> => {
    const token = await executeRecaptcha('login');

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/send-verification-otp-email-and-verify-recaptcha`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            name: fullName,
            gRecaptchaToken: token,
          }),
        }
      );

      if (response.ok) {
        // console.log('Verification OTP sent successfully');
        setMessage(
          'We have sent you email with a six- character code. Please enter it here.'
        );
        setIsOtpSent(true);
      } else {
        const errorData = await response.json();
        console.error('Failed to send verification OTP', errorData);
        setMessage(
          `Failed to send verification OTP: ${errorData.message || 'Please try again.'}`
        );
      }
    } catch (error: any) {
      console.error('Error sending verification OTP:', error);
      setMessage(
        'An error occurred while sending verification OTP. Please try again.'
      );
    }
  };

  const checkEmailExists = async () => {
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
    <>
      <div className="mt-1 text-2xl font-medium text-black md:text-3xl">
        Sign up
      </div>
      <form className="mt-2 w-[80%]" onSubmit={(e) => e.preventDefault()}>
        <FormField
          label="Full Name"
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="md:w-80"
        />
        <FormField
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onBlur={checkEmailExists}
          placeholder="Email"
          className="md:w-80"
        />
        {emailExists && (
          <div className="mb-1 mt-1 text-start text-red-500">
            Email already exists
          </div>
        )}
        <FormField
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          placeholder="Password"
          className="md:w-80"
        />

        {(passwordFocused || password) && (
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
        )}

        <GoogleButton />
        <StyledButton
          type="button"
          onClick={() => sendVerificationOtpEmail(email, fullName)}
          className="mt-2 w-full"
          disabled={!passwordValid || emailExists || !fullName || !email}
          variant="primary"
          label="Sign up"
        />
      </form>
    </>
  );
};

export default InfoForm;
