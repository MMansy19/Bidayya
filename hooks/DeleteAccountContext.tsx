import React, { createContext, useContext, useState } from 'react';

// Define the shape of the context
interface DeleteAccountContextProps {
  deleteAccount: boolean;
  setDeleteAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
const DeleteAccountContext = createContext<
  DeleteAccountContextProps | undefined
>(undefined);

// Create a provider component
export const DeleteAccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [deleteAccount, setDeleteAccount] = useState<boolean>(false);

  return (
    <DeleteAccountContext.Provider value={{ deleteAccount, setDeleteAccount }}>
      {children}
    </DeleteAccountContext.Provider>
  );
};

// Create a custom hook to use the context
export const useDeleteAccount = () => {
  const context = useContext(DeleteAccountContext);
  if (!context) {
    throw new Error(
      'useDeleteAccount must be used within a DeleteAccountProvider'
    );
  }
  return context;
};
