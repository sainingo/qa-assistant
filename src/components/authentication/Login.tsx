import { useState, useContext } from "react";
import Logo from '../../public/AMPATH_Logo_Color.png';
import ClipLoader from "react-spinners/ClipLoader";
import {useNavigate} from 'react-router-dom'
import AuthenticationResource from "./AuthenticationResource";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
const [errorMessage,setErrorMessage] = useState("");
const [FormData,SetFormData] = useState({username:'',userPassword:'',})
const { username, userPassword} = FormData;
const [Loading,isLoading] = useState(false)
const navigate = useNavigate();
const onChange = (e: { target: { name: any; value: any; };
})=>{SetFormData({...FormData, [e.target.name]:e.target.value})}
const isAuthenticated = localStorage.getItem("authenticated");
if(isAuthenticated&&isAuthenticated==="true"){
    setTimeout(()=>{window.location.href = "/"},1200)    
} 
//Handle Authentication
const submitLoginForm=  async ()=>{
setErrorMessage("")
isLoading(true) 
const errorMessage = await AuthenticationResource(username, userPassword);
if (errorMessage) {
setErrorMessage(errorMessage)
}
else{
toast.success("Logged In")
setTimeout(()=>{
navigate("/")
},1200)
}
isLoading(false)
}
//Handle Error Messages
const DisplayErrorMessage = ()=>{
return(
    <div >
        <p data-testid = "state-error"className="text-red-500 font-bold">{errorMessage}</p>
    </div>
    ) 
}
return (
<section className="h-screen bg-gray-100 flex items-center ">
    <div className="bg-white shadow-md border px-10 pt-10 pb-10 mx-auto">
    <img src = {Logo} className = "h-12 mx-auto mb-10"/>
        <form>
            <div>
            <input autoComplete="off" onChange={onChange} name = "username" className="shadow  border rounded p-4 " type="text" placeholder="Username" required />
            </div>
            <div className="mt-10">
            <input autoComplete="off" onChange={onChange} name="userPassword" className="shadow border rounded p-4" type="password" placeholder="Password" required />
            </div>
            <div data-test-id="errors-div">
            {errorMessage && <DisplayErrorMessage/>}
            </div>
        <div className="flex justify-end p-5">
        {Loading ? <button className= "bg-blue-500 hover:bg-blue-700  w-[35%] text-white font-bold py-4 px-4 rounded" type="button"><ClipLoader size={20} color = "white"/></button>: 
    <button onClick={submitLoginForm} className= "bg-blue-500 hover:bg-blue-700  w-[35%] text-white font-bold py-4 px-4 rounded" type="button"> Log In </button>}
    </div>
</form>
<ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={true} closeOnClick theme="colored" />
</div> 
</section>
)
}
export default Login;
