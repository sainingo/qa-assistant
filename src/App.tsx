import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContext, AppContextType } from "./context/AppContext";
import { useState } from "react";
import PatientSearch from "./components/patientSearch/Patient";
import Orders from "./Components/Orders/Orders.component";
import Login from "./components/authentication/Login";
import ProtectedRoutes from "./components/authentication/ProtectedRoutes";
import PatientInformation from "./components/PatientInformation";

const App = () => {
  const [currentPatient] = useState<Object[]>([]);

  const contextValue: AppContextType = {
    currentPatient,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <Routes>
          <Route path="/" element={<PatientSearch />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />} />
          <Route path="/patients/:id" element={<PatientInformation />} />
          <Route path="/patient/:id/orders" element={<Orders />} />
        </Routes>
      </Router>
      {/* div below is for testing purposes */}
      <div data-testid="app-context-value">{JSON.stringify(contextValue)}</div>
    </AppContext.Provider>
  );
};

export default App;
