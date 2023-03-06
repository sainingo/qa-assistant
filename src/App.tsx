import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { AppContext, AppContextType } from "./context/AppContext";
import { useState } from "react";

const App =  () => {
  const [patients, setPatients] = useState<[]>([])
  const [patientData, setPatientData] = useState<[]>([])


  const searchPatient = async (query: string) => {           
       
    await fetch(`openmrs/ws/rest/v1/patient?q=${query}&v=default&limit=full`,{
        method:"GET",
        redirect: 'follow'
    })
    .then((Response=>Promise.all(([Response.headers, Response.json()]))))
    .then(([_,response])=> setPatients(response.results))
}

const contextValue: AppContextType = {
  patients,
  patientData,
  searchPatient,
}

// console.log(patients)
  return (
    <AppContext.Provider value={contextValue}>
    <Router>
    <Routes>
        <Route path="/" element={<Home />} />  
    </Routes>
    </Router>
    </AppContext.Provider>
  );
};

export default App;
