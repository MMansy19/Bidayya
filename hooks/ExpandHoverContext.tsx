import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context with default values
interface ExpandHoverContextProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  hover: boolean;
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExpandHoverContext = createContext<ExpandHoverContextProps | undefined>(
  undefined
);

// Provider component
export const ExpandHoverProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expanded, setExpanded] = useState(window.innerWidth > 768);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const handleResize = () => setExpanded(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ExpandHoverContext.Provider
      value={{ expanded, setExpanded, hover, setHover }}
    >
      {children}
    </ExpandHoverContext.Provider>
  );
};

// Custom hook to use the context
export const useExpandHover = () => {
  const context = useContext(ExpandHoverContext);
  if (!context) {
    throw new Error(
      'useExpandHover must be used within an ExpandHoverProvider'
    );
  }
  return context;
};
