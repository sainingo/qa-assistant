import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './app/main/Home';
import Login from './app/authentication/Login';
import PatientInfo from './app/patient-dashboard/info/PatientInfo';
import PatientSearch from './app/patient-search/Patient';
import PatientOrders from './app/patient-dashboard/orders/PatientOrders.component';
import { AppContextProvider } from './app/AppContextProvider';
import Observation from './app/patient-dashboard/observations/Observation';
import { useEffect } from 'react';
import { getSession } from './app/Session';
import CsvUpload from './app/csv-uploads/CsvUpload';
import Moh731SyncQueueComponent from './app/rde-sync/Moh731Sync.component';
import AddPatientIdentifier from './app/rde-sync/AddPatients.component';

const App = () => {
  useEffect(() => {
    const session = getSession();
    if (!session) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patient-search" Component={PatientSearch} />
          <Route path="/patient-dashboard/:uuid" element={<PatientInfo />} />
          <Route path="/patient-dashboard/:uuid/orders" element={<PatientOrders />} />
          <Route path="/patient-dashboard/:uuid/observations" element={<Observation />} />

          <Route path="/lab-results-sync" element={<CsvUpload />} />
          <Route path="/moh-731-sync" element={<Moh731SyncQueueComponent />} />
          <Route path="/moh-731-sync/add-patients" element={<AddPatientIdentifier />} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
};

export default App;
