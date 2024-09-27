import React from 'react';
import MainLayout from '../components/MainLayout';
import SettingsComponent from '../components/settings/SettingsComponent';
import DeleteAccount from '../components/settings/DeleteAccount';
import { useDeleteAccount } from '../hooks/DeleteAccountContext';
import useCheckAuthentication from '../hooks/useCheckAuthentication';
const Settings: React.FC = () => {
  const { deleteAccount } = useDeleteAccount();
  useCheckAuthentication();
  return (
    <div>
      <MainLayout>
        {!deleteAccount && <SettingsComponent />}
        {deleteAccount && <DeleteAccount />}
      </MainLayout>
    </div>
  );
};

export default Settings;
