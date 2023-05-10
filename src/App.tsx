import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContext, AppContextType,  PatientObjSubset } from './context/AppContext';
import {  useState } from 'react';
import PatientSearch from './components/patientSearch/Patient';
import Orders from './components/Orders/Orders.component';
import Login from './components/authentication/Login';
import ProtectedRoutes from './components/authentication/ProtectedRoutes';
import PatientInformation from './components/PatientInformation';
import Home from './components/layout/Home';
import Moh731SyncQueueComponent from './components/RdeSync/Moh731Sync.component';
import AddPatientIdentifier from './components/RdeSync/AddPatients.component';

const App = () => {
  const [currentPatient, setCurrentPatient] = useState<PatientObjSubset>({
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
  });

  const contextValue: AppContextType = {
    currentPatient: {
      preferredName: currentPatient.preferredName || {
        uuid: '',
        display: '',
        links: [],
      },
      preferredAddress: currentPatient.preferredAddress || {
        uuid: '',
        display: '',
        links: [],
      },
      gender: currentPatient.gender || '',
      age: currentPatient.age || 0,
      birthdate: currentPatient.birthdate || '',
    },
    setCurrentPatient,
  };
  // useEffect(() => {
  //   const verifySession = setInterval(async () => {
  //     const isSessionActive = await CheckSession()
  //     if(isSessionActive ==='false' && window.location.pathname !=="/login"){
  //       DeleteSession()
  //     }
  //   }, 30000);
  //   return () => clearInterval(verifySession);
  // }, []);
  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/patient-search" element={<PatientSearch />} />
            <Route path="/patientInfo/:id" element={<PatientInformation />} />
            <Route path="/patient/:id/orders" element={<Orders />} />
            <Route path="/moh-731-sync" element={<Moh731SyncQueueComponent />} />
            <Route path="/moh-731-sync/add-patients" element={<AddPatientIdentifier />} />
          </Route>
        </Routes>
      </Router>
      {/* div below is for testing purposes */}
      {/* <div data-testId="app-context-value">{JSON.stringify(contextValue)}</div> */}
    </AppContext.Provider>
  );
};

export default App;
