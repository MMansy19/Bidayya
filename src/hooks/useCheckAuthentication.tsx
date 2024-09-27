import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signOut } from '../store/UserSlice';
import { RootState } from '../store';

const useCheckAuthentication = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const validateToken = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/validate-token`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        dispatch(signOut());
      }
      const data = await response.json();
      if (data.user) dispatch(signIn({ user: data.user }));
    } catch (error) {
      console.error('Error validating token:', error);
    }
  };
  return useEffect(() => {
    validateToken();
  }, []);
};

export default useCheckAuthentication;
