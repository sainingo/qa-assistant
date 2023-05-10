import React from 'react';
export interface AppContextType {
  // eslint-disable-next-line @typescript-eslint/ban-types
  currentPatient: Object[];
}

export const AppContext = React.createContext<AppContextType>({
  currentPatient: [],
});
