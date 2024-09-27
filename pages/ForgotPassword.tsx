import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import InfoForm from '../components/forgetPassword/InfoForm';
import VerificationEmail from '../components/forgetPassword/VerificationEmail';
import NewPassword from '../components/forgetPassword/NewPassword';
import useCheckAuthentication from '../hooks/useCheckAuthentication';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');

  const [message, setMessage] = useState<string>(
    "If the email you enter matches an account, we'll send a reset code to:"
  );

  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [optVerified, setOtpVerified] = useState<boolean>(false);
  const [resetToken, setResetToken] = useState<string>('');

  useCheckAuthentication();

  return (
    <AuthForm>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-extrabold text-regal-blue md:text-3xl">
          Welcome to Bidayya
        </h2>
        {!isOtpSent && (
          <InfoForm
            username={username}
            setUsername={setUsername}
            message={message}
            setMessage={setMessage}
            setIsOtpSent={setIsOtpSent}
          />
        )}
        {isOtpSent && !optVerified && (
          <VerificationEmail
            username={username}
            message={message}
            setMessage={setMessage}
            setResetToken={setResetToken}
            setIsOtpSent={setIsOtpSent}
            setOtpVerified={setOtpVerified}
          />
        )}
        {optVerified && (
          <NewPassword
            message={message}
            setMessage={setMessage}
            resetToken={resetToken}
          />
        )}
      </div>
    </AuthForm>
  );
};

export default ForgotPassword;
