import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Layout from './components/layout/Layout';
import Home from './app/main/Home';
// import PatientSearch from './components/patientSearch/Patient';
// import PatientInformation from './app/patient-dashboard/patient-info/PatientInformation';
// import Orders from './components/Orders/Orders.component';
// import Observation from './components/observations/Observation';
import Login from './components/authentication/Login';
import PatientInfo from './app/patient-dashboard/info/PatientInfo';
import PatientSearch from './app/patient-search/Patient';
import PatientOrders from './app/patient-dashboard/orders/PatientOrders.component';
import { AppContextProvider } from './app/AppContextProvider';
import Observation from './app/patient-dashboard/observations/Observation';

const App = () => {
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
        </Routes>

        {/* <Routes>
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
        </Routes> */}
      </Router>
      {/* div below is for testing purposes */}
      {/* <div data-testId="app-context-value">{JSON.stringify(contextValue)}</div> */}
    </AppContextProvider>
  );
};

export default App;
