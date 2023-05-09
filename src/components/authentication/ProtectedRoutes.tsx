import { Outlet } from 'react-router-dom';
import Login from './Login';

const ProtectedRoutes = () => {
  const isAuthenticated = localStorage.getItem('authenticated');
  return isAuthenticated ? <Outlet /> : <Login />;
};
export default ProtectedRoutes;
