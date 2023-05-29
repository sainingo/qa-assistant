/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { Patient } from './types/Patient';

export type AuthStatus = {
  isAuthenticated: boolean;
};

type ContextType = {
  currentPatient: Patient | null;
  authStatus: AuthStatus;
  setCurrentPatient: (patient: Patient | null) => void;
  setAuthStatus: (authStatus: AuthStatus) => void;
};

export const defaultAuthStatus: AuthStatus = {
  isAuthenticated: false,
};

const defaultContext: ContextType = {
  currentPatient: null,
  authStatus: defaultAuthStatus,
  setCurrentPatient: () => {},
  setAuthStatus: () => {},
};

export const GlobalContext = createContext<ContextType>(defaultContext);
