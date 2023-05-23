import { useState } from 'react';
import { AuthStatus, GlobalContext, defaultAuthStatus } from './GlobalContext';
import { Patient } from './types/Patient';

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }: AppContextProviderProps) => {
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>(defaultAuthStatus);

  return (
    <GlobalContext.Provider value={{ currentPatient, setCurrentPatient, authStatus, setAuthStatus }}>
      {children}
    </GlobalContext.Provider>
  );
};
