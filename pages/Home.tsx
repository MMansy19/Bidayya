import React from 'react';
import MainLayout from '../components/MainLayout';
import useCheckAuthentication from '../hooks/useCheckAuthentication';
import StyledButton from '../atoms/common/StyledButton';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  useCheckAuthentication();
  return (
    <div>
      <MainLayout>
        <h1 className="mt-40 text-4xl font-semibold">Home Page</h1>
        <div className="my-6 flex flex-col items-center justify-center gap-6 md:flex-row">
          <Link to="/create-competition">
            <StyledButton label="Create Competition Page" />
          </Link>

          <Link to="/competitions/1">
            <StyledButton label="Competition Page" />
          </Link>
        </div>
      </MainLayout>
    </div>
  );
};

export default Home;
