import FormField from '../../atoms/auth/FormField';
import StyledButton from '../../atoms/common/StyledButton';

const InfoForm = ({
  username,
  setUsername,
  message,
  setMessage,
  setIsOtpSent,
}: {
  username: string;
  setUsername: (username: string) => void;
  message: string;
  setMessage: (message: string) => void;
  setIsOtpSent: (isOtpSent: boolean) => void;
}) => {
  const handleSendOtp = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/forget-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: username,
          }),
        }
      );

      if (response.ok) {
        console.log('OTP sent successfully');
        setMessage(
          'we have sent you email with a six- character code. Please enter it here.'
        );
        setIsOtpSent(true);
      } else {
        const errorData = await response.json();
        console.error('OTP sending failed', errorData);
        setMessage(
          `OTP sending failed: ${errorData.message || 'Please try again.'}`
        );
      }
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      setMessage('An error occurred while sending OTP. Please try again.');
    }

    
  };

  return (
    <>
      <div className="mt-2 text-2xl font-medium text-black md:text-3xl">
        Reset your password
      </div>
      {message && (
        <div className="mt-4 text-start text-light-blue">{message}</div>
      )}

      <form className="mt-2">
        <FormField
          label="Enter your  email address"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email address"
          className="md:w-80"
        />

        <div className="mt-40 flex justify-between gap-20">
          <StyledButton
            type="button"
            onClick={() => {
              window.history.back();
            }}
            variant="secondary"
            label="Back"
            icon="back"
          />
          <StyledButton
            type="button"
            onClick={handleSendOtp}
            variant="primary"
            label="Next"
          />
        </div>
      </form>
    </>
  );
};

export default InfoForm;
