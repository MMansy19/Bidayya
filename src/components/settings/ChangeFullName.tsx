import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import StyledButton from '../../atoms/common/StyledButton';
import InputField from './InputField';

const ChangeFullName = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [showNameInput, setShowNameInput] = useState(false);
  const [nameChanged, setNameChanged] = useState(false);
  const [error, setError] = useState<string>('');

  const handleChangeFullName = () => setShowNameInput(true);

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${user?.id}`,
        {
          method: 'PATCH',
          credentials: 'include',

          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName,
          }),
        }
      );
      if (response.ok) {
        setNameChanged(true);
        setShowNameInput(false);
      } else {
        const errorData = await response.json();
        setError('Failed to change full name: ' + errorData.message);
        console.error('Failed to change full name:', errorData);
      }
    } catch (error: any) {
      console.error('Error changing full name:', error);
    }
  };

  useEffect(() => {
    if (nameChanged) {
      const timeoutId = setTimeout(() => {
        setNameChanged(false);
      }, 3000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [nameChanged]);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError('');
      }, 3000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [error]);

  return (
    <div className="flex flex-col items-start gap-3">
      {!showNameInput ? (
        <>
          <p className="text-sm">{fullName}</p>
          <StyledButton
            className="border-2 border-black uppercase hover:border-white"
            type="button"
            variant="secondary"
            label="Change Full Name"
            onClick={handleChangeFullName}
          />
        </>
      ) : (
        <div className="flex flex-col items-start space-y-4">
          <InputField
            id="fullName"
            placeholder="Enter new full name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex justify-end">
            <StyledButton
              className="border-2 border-black uppercase hover:border-white"
              type="button"
              variant="secondary"
              label="Save"
              onClick={handleSaveChanges}
              disabled={fullName === ''}
            />
          </div>
        </div>
      )}
      {nameChanged && (
        <div className="text-light-blue">Full Name Changed Successfully</div>
      )}
    </div>
  );
};

export default ChangeFullName;
