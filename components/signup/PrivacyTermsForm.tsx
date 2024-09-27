import StyledButton from '../../atoms/common/StyledButton';

const PrivacyTermsForm = ({
  setMessage,
  setFullName,
  setEmail,
  setPassword,
  setOtp,
  setIsOtpSent,
  setIsPrivacyTermsAccepted,
}: {
  setMessage: (message: string) => void;
  setFullName: (fullName: string) => void;

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setOtp: (otp: string) => void;
  setIsOtpSent: (isOtpSent: boolean) => void;
  setIsPrivacyTermsAccepted: (isPrivacyTermsAccepted: boolean) => void;
}) => {
  const handleCancel = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setOtp('');
    setIsOtpSent(false);
    setMessage('');
  };

  return (
    <>
      <div className="mt-1 text-2xl font-medium text-black md:text-3xl">
        Privacy and Terms
      </div>

      
      <div className="flex w-full items-center justify-between">
        <StyledButton
          type="button"
          onClick={handleCancel}
          className="mt-2 w-fit"
          variant="secondary"
          label="Cancel"
        />
        <StyledButton
          type="button"
          onClick={() => {
            setIsPrivacyTermsAccepted(true);
          }}
          className="mt-2 w-fit"
          variant="primary"
          label="I Agree"
        />
      </div>
    </>
  );
};

export default PrivacyTermsForm;
