import React, { createContext, useContext, ReactNode } from 'react';
import { CompetitionDetails } from '../types';

interface CompetitionContextType {
  competition: CompetitionDetails;
}

const CompetitionContext = createContext<CompetitionContextType | undefined>(
  undefined
);

export const CompetitionProvider: React.FC<{
  competition: CompetitionDetails;
  children: ReactNode;
}> = ({ competition, children }) => {
  return (
    <CompetitionContext.Provider value={{ competition }}>
      {children}
    </CompetitionContext.Provider>
  );
};

export const useCompetition = () => {
  const context = useContext(CompetitionContext);
  if (context === undefined) {
    throw new Error('useCompetition must be used within a CompetitionProvider');
  }
  return context;
};
