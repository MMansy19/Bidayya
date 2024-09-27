// src/components/pages/Signin.jsx
import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import FormField from '../atoms/auth/FormField';
import StyledButton from '../atoms/common/StyledButton';
import { Link } from 'react-router-dom';

import GoogleButton from '../atoms/common/GoogleButton';

import { useDispatch } from 'react-redux';
import { signIn } from '../store/UserSlice';
import { User } from '../types';
import useCheckAuthentication from '../hooks/useCheckAuthentication';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const [message, setMessage] = useState<string>('');

  useCheckAuthentication();

  const handleSignIn = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/signin`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const user: User = data.user;
        dispatch(signIn({ user }));
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        console.error('Failed to login', errorData);
        setMessage(
          `Failed to login: ${errorData.message || 'Please try again.'}`
        );
      }
    } catch (error: any) {
      console.error('Error singing in:', error);
      setMessage('An error occurred while signing in. Please try again.');
    }
  };

  return (
    <AuthForm>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-extrabold text-regal-blue md:text-3xl">
          Welcome to Bidayya
        </h2>
        <div className="mt-2 text-2xl font-medium text-black md:text-3xl">
          Sign in
        </div>

        {message && <div className="mt-2 text-red-500">{message}</div>}

        <form className="mt-4">
          <FormField
            label="Enter your username or email address"
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Username or email address"
            className="md:w-80"
          />
          <FormField
            label="Enter your password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="md:w-80"
            forgetPassword={true}
          />
          <GoogleButton />
          <StyledButton
            type="button"
            onClick={handleSignIn}
            disabled={!email || !password}
            className="mt-2 w-full"
            variant="primary"
            label="Sign in"
          />
        </form>
        <div className="mt-4 text-center">
          <span className="text-xs font-medium text-blue-700">
            No Account? <br />
          </span>
          <span className="cursor-pointer text-sm font-normal text-yellow-600 hover:underline">
            <Link to="/signup">Sign up</Link>
          </span>
        </div>
      </div>
    </AuthForm>
  );
};

export default Signin;
