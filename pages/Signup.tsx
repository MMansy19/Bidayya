import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';

import InfoForm from '../components/signup/InfoForm';
import OTPForm from '../components/signup/OTPForm';
import PrivacyTermsForm from '../components/signup/PrivacyTermsForm';
import useCheckAuthentication from '../hooks/useCheckAuthentication';

const Signup: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [isPrivacyTermsAccepted, setIsPrivacyTermsAccepted] =
    useState<boolean>(false);
  
  useCheckAuthentication();

  return (
    <AuthForm>
      <div className="flex max-w-[400px] flex-col items-center">
        <h2 className="text-2xl font-extrabold text-regal-blue md:text-3xl">
          Welcome to Bidayya
        </h2>

        {/* {message && <div className="mt-2 text-red-500">{message}</div>}{' '} */}
        {!isOtpSent && (
          <InfoForm
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            setMessage={setMessage}
            setIsOtpSent={setIsOtpSent}
          />
        )}
        {!isPrivacyTermsAccepted && isOtpSent && (
          <PrivacyTermsForm
            setMessage={setMessage}
            setFullName={setFullName}
            setEmail={setEmail}
            setPassword={setPassword}
            setIsOtpSent={setIsOtpSent}
            setOtp={setOtp}
            setIsPrivacyTermsAccepted={setIsPrivacyTermsAccepted}
          />
        )}
        {isPrivacyTermsAccepted && (
          <OTPForm
            email={email}
            fullName={fullName}
            password={password}
            message={message}
            setMessage={setMessage}
            otp={otp}
            setOtp={setOtp}
          />
        )}

        <div className="mt-4 text-xs font-normal leading-normal text-black">
          By signing up, you agree to our{' '}
          <span className="underline">Terms & Conditions</span>
        </div>
      </div>
    </AuthForm>
  );
};

export default Signup;
