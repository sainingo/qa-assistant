import React from 'react';

export interface PatientObj {
  uuid: string;
  display: string;
  identifiers: [];
  person: {
    preferredName: {
      display: string;
    };
    preferredAddress: {
      display: string;
    };
    gender: string;
    age: number;
    birthdate: string;
  };
  voided: boolean;
  resourceVersion: string;
}

export interface PatientObjSubset {
  preferredName?: {
    uuid?: string;
    display?: string;
    links?: Array<{ rel: string; uri: string; resourceAlias: string }>;
  };
  preferredAddress?: {
    uuid?: string;
    display?: string;
    links?: Array<{ rel: string; uri: string; resourceAlias: string }>;
  };
  gender?: string;
  age: number;
  birthdate?: string;
}

export interface AppContextType {
  currentPatient: PatientObjSubset;
  setCurrentPatient: React.Dispatch<React.SetStateAction<PatientObjSubset>>;
}

export const AppContext = React.createContext<AppContextType>({
  currentPatient: {
    preferredName: {
      uuid: '',
      display: '',
      links: [],
    },
    preferredAddress: {
      uuid: '',
      display: '',
      links: [],
    },
    gender: '',
    age: 0,
    birthdate: '',
  },
  setCurrentPatient: () => {},
});
