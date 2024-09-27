import { useState } from 'react';
import FormField from '../../atoms/auth/FormField';
import StyledButton from '../../atoms/common/StyledButton';
const VerificationEmail = ({
  username,
  message,
  setMessage,
  setResetToken,
  setIsOtpSent,
  setOtpVerified,
}: {
  username: string;
  message: string;
  setMessage: (message: string) => void;
  setResetToken: (resetToken: string) => void;
  setIsOtpSent: (isOtpSent: boolean) => void;
  setOtpVerified: (otpVerified: boolean) => void;
}) => {
  const [otp, setOtp] = useState<string>('');

  const handeVerifyOtp = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/verify-otp-and-send-reset-token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: username,
            otp,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setResetToken(data.reset_token);
        setMessage(
          'Last step! Please choose a new password to use when you sign in.'
        );
        setOtpVerified(true);
      } else {
        const errorData = await response.json();
        console.error('OTP verification failed', errorData);
        setMessage(
          `OTP verification failed: ${errorData.message || 'Please try again.'}`
        );
      }
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      setMessage('An error occurred while verifying OTP. Please try again.');
    }

    
  };
  return (
    <>
      <div className="mt-2 text-2xl font-medium text-black md:text-3xl">
        Verification email sent
      </div>
      <div className="mt-4 text-start text-light-blue">{message}</div>

      <form className="mt-2">
        <FormField
          label="Six character code"
          type="text"
          id="username"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter six character code"
          className="md:w-80"
        />

        <div className="mt-40 flex justify-between gap-16">
          <StyledButton
            type="button"
            onClick={() => {
              setIsOtpSent(false);
            }}
            variant="secondary"
            label="Resend email"
            // icon="back"
          />
          <StyledButton
            type="button"
            onClick={handeVerifyOtp}
            variant="primary"
            label="Next"
          />
        </div>
      </form>
    </>
  );
};

export default VerificationEmail;
