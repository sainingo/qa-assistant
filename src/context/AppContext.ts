import React from "react";

export interface AppContextType {
    patients: [];
    patientData: [];
    searchPatient: (query: string) => Promise<void>;
}

export const AppContext = React.createContext<AppContextType>({
    patients: [],
    patientData: [],
    searchPatient: async (query: string) => {}
})