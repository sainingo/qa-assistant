import Login from "./authentication/Login/Login";
import { BrowserRouter as Router,  Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProtectedRoutes from "./authentication/ProtectedRoutes";
const App =  () => {
  return (
    <Router>
    <Routes>
        <Route path="/login" element={<Login />}/> 
        <Route element = {<ProtectedRoutes/>}>
        <Route path="/" element={<Home />}/>
        </Route>     
    </Routes>
    </Router>
  );
}
export default App;
