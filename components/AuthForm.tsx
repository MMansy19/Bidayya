import React, { ReactNode } from 'react';
import authIcon from '../assets/images/auth-icon.png';

interface AuthFormProps {
  children: ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ children }) => {
  return (
    <>
      <div className="bg-left-half-gradient">
        <div className="relative hidden h-screen -translate-y-16 flex-col justify-center md:flex">
          <div className="translate-x-28">
            <img src={authIcon} alt="auth-icon" />
          </div>
          <div className="h-px w-[600px] border-4 border-white"></div>
        </div>
      </div>
      <main className="flex h-screen items-center justify-center">
        <div className="z-1 max-w-[450px] rounded-3xl bg-white sm:p-6 p-4 shadow-2xl">
          {children}
        </div>
      </main>
    </>
  );
};

export default AuthForm;
