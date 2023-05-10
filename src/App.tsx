import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContext, AppContextType } from './context/AppContext';
import { useState } from 'react';
import PatientSearch from './components/patientSearch/Patient';
import Orders from './components/Orders/Orders.component';
import Login from './components/authentication/Login';
import ProtectedRoutes from './components/authentication/ProtectedRoutes';
import PatientInformation from './components/PatientInformation';
import Home from './components/layout/Home';
import CsvUpload from './components/csvUploads/CsvUpload';
import SearchPatientIdentifier from './components/RdeSync/AddPatients.component';
import Moh731SyncQueueComponent from './components/RdeSync/Moh731Sync.component';
import Observation from './components/observations/Observation';

const App = () => {
  const [currentPatient] = useState<Object[]>([]);

  const contextValue: AppContextType = {
    currentPatient,
  };

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
            <Route path="/lab-results-sync" element={<CsvUpload />} />
            <Route path="/moh-731-sync" element={<Moh731SyncQueueComponent />} />
            <Route path="/moh-731-sync/add-patients" element={<SearchPatientIdentifier />} />
            <Route path="/observations/:id" element={<Observation />} />
          </Route>
        </Routes>
      </Router>
      {/* div below is for testing purposes */}
      {/* <div data-testId="app-context-value">{JSON.stringify(contextValue)}</div> */}
    </AppContext.Provider>
  );
};

export default App;
