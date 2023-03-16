import { Outlet } from "react-router"
import Login from "./Login/Login"

const AuthenticateUser = () =>{
const isAuthenticated = localStorage.getItem("authenticated")
return isAuthenticated && isAuthenticated
}
const ProtectedRoutes = () => {
const isAuthenticated = AuthenticateUser()
return isAuthenticated? <Outlet/>:<Login/>
}
export default ProtectedRoutes
