import React from 'react';
export interface AppContextType {
  currentPatient: Object[];
}

export const AppContext = React.createContext<AppContextType>({
  currentPatient: [],
});
