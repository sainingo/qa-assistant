import React from "react";
export interface AppContextType {
  currentPatient: Object[];
  BASE_URL: string;
}

export const AppContext = React.createContext<AppContextType>({
  currentPatient: [],
  BASE_URL: "https://dev3.openmrs.org",
});
