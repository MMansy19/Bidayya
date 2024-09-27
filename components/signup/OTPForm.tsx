import FormField from '../../atoms/auth/FormField';
import StyledButton from '../../atoms/common/StyledButton';

import { useDispatch } from 'react-redux';
import { signUp } from '../../store/UserSlice';
import { User } from '../../types';

const OTPForm = ({
  fullName,
  password,
  email,
  message,
  setMessage,
  otp,
  setOtp,
}: {
  email: string;
  fullName: string;
  password: string;
  message: string;
  setMessage: (message: string) => void;
  otp: string;
  setOtp: (otp: string) => void;
}) => {
  const dispatch = useDispatch();
  const handleSignUp = async () => {
    setMessage('');

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/verify-otp-and-signup`,
        {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            full_name: fullName,
            email,
            password,
            otp,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // console.log('Sign up successful', data);

        const user: User = data.user;
        const access_token: string = data.access_token;
        dispatch(signUp({ user, access_token }));

        // setMessage(
        //   'Sign up successful! Please check your email for the verification OTP.'
        // );

        window.location.href = '/';

        // Send verification OTP email
        // await sendVerificationOtpEmail(email, fullName);
      } else {
        const errorData = await response.json();
        console.error('Sign up failed', errorData);
        setMessage(
          `Sign up failed: ${errorData.message || 'Please try again.'}`
        );
      }
    } catch (error: any) {
      console.error('Error:', error);
      setMessage(`An error occurred: ${error.message || 'Please try again.'}`);
    }
  };

  return (
    <>
      <div className="mt-1 text-2xl font-medium text-black md:text-3xl">
        Verfication email sent
      </div>
      <div className="mt-2 text-start text-light-blue">{message}</div>
      <form className="mt-2 w-[80%]" onSubmit={(e) => e.preventDefault()}>
        <FormField
          label="OTP"
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="md:w-80"
        />
        <StyledButton
          type="button"
          onClick={handleSignUp}
          className="mt-2 w-full"
          variant="primary"
          label="Verify OTP"
        />
      </form>
    </>
  );
};

export default OTPForm;
