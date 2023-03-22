import { useEffect, useState } from "react";
import Logo from "../../public/AMPATH_Logo_Color.png";
import ClipLoader from "react-spinners/ClipLoader";
import AuthenticationResource from "./AuthenticationResource";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem("authenticated");
  if(isAuthenticated && isAuthenticated ==="true"){
    setTimeout(()=>{window.location.href = "/"},1200)   
  }
  const [errorMessage, setErrorMessage] = useState("");
  const [FormData, SetFormData] = useState({ username: "", userPassword: "" });
  const { username, userPassword } = FormData;
  const [Loading, isLoading] = useState(false);
  const [selectedServer, setSelectedServer] = useState(
    "https://ngx.ampath.or.ke/amrs"
  );
  const [isHidden, setIsHidden] = useState(false);
  const [customServer, setCustomServer] = useState("");

  // set localstorage value
  const setLocalStorage = (key: string, value: string): void => {
    localStorage.setItem(key, value);
  };

  const onChange = (e: { target: { name: any; value: any } }) => {
    SetFormData({ ...FormData, [e.target.name]: e.target.value });
  };
  //Handle Authentication
  const submitLoginForm = async () => {
    isLoading(true);
    const errorMessage = await AuthenticationResource(username, userPassword);
    if (errorMessage) {
      setErrorMessage(errorMessage);
    }
    else{
      toast.success("Logged In")
      setTimeout(()=>{
      navigate("/")
      },1200)
      }
    isLoading(false);
  };
  //Handle Error Messages
  const DisplayErrorMessage = () => {
    return (
      <div>
        <p data-testid="state-error" className="text-red-500 font-bold">
          {errorMessage}
        </p>
      </div>
    );
  };

  useEffect(() => {
    setLocalStorage("selectedServerUrl", selectedServer);
  }, [selectedServer]);

  const handleChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    if (value === "custom-server") {
      setIsHidden(true);
      setSelectedServer(value);
      setLocalStorage("selectedServerUrl", customServer);
    } else {
      setIsHidden(false);
      setSelectedServer(value);
      setLocalStorage("selectedServerUrl", value);
    }
  };

  // enter key press
  const handleCustomUrlChange = (e: { target: { value: any } }) => {
    setCustomServer(e.target.value);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      setSelectedServer(customServer);
      setLocalStorage("selectedServerUrl", customServer);
      setIsHidden(false);
      setCustomServer("");
    }
  };

  return (
    <section className="h-screen bg-gray-100 flex items-center ">
      <div className="bg-white shadow-md border p-16 w-[30%] mx-auto">
        <img src={Logo} className=" mx-auto mb-10" />
        <form>
          <div className="mb-8">
            <h3 className="p-2">OpenMRS server URL</h3>
            <select
              className="shadow  border rounded p-4 w-full outline-none"
              value={selectedServer}
              onChange={handleChange}
            >
              <option className="p-4" value="https://ngx.ampath.or.ke/amrs">
                https://amrs.ampath.or.ke/amrs
              </option>
              <option className="p-4" value="https://staging.ampath.or.ke/amrs">
                https://staging.ampath.or.ke/amrs
              </option>
              <option className="p-4" value="custom-server">
                Enter a customer URL
              </option>
            </select>
          </div>
          <div className={isHidden ? "block" : "hidden"}>
            <h3 className="p-2">Custom server URL</h3>
            <input
              autoComplete="off"
              onChange={handleCustomUrlChange}
              onKeyDown={handleKeyDown}
              value={customServer}
              className="shadow outline-none  border rounded p-4 w-full"
              type="text"
              placeholder="Enter custom server URL"
              required
            />
          </div>
          <div className="mt-8">
            <input
              autoComplete="off"
              onChange={onChange}
              name="username"
              className="shadow  border rounded p-4 w-full"
              type="text"
              placeholder="Username"
              required
            />
          </div>
          <div className="mt-8">
            <input
              autoComplete="off"
              onChange={onChange}
              name="userPassword"
              className="shadow border rounded p-4 w-full"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div data-test-id="errors-div">
            {errorMessage && <DisplayErrorMessage />}
          </div>
          <div className="flex justify-end p-5">
          {Loading ? <button className= "bg-blue-500 hover:bg-blue-700  w-[35%] text-white font-bold py-4 px-4 rounded" type="button"><ClipLoader size={20} color = "white"/></button>: 
    <button onClick={submitLoginForm} className= "bg-blue-500 hover:bg-blue-700  w-[35%] text-white font-bold py-4 px-4 rounded" type="button"> Log In </button>}
          </div>
        </form>
        <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={true} closeOnClick theme="colored" />
      </div>
    </section>
  );
};
export default Login;
