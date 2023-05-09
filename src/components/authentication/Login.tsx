import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../public/ampath-logo.png';
import AuthenticationResource from './AuthenticationResource';
import ErrorAlert from '../alerts/ErrorAlert';

const Login = () => {
  const navigate = useNavigate();

  const [formdata, SetFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState('');

  const { username, password } = formdata;

  const handleLogin = async () => {
    setIsLoading(true);
    const result = await AuthenticationResource(username, password);
    if (result) {
      setIsLoading(false);
      setError(result);
    } else {
      setIsLoading(false);
      navigate('/');
      localStorage.setItem('authenticated', 'true');
    }
  };

  const onChange = (e: { target: { name: any; value: any } }) => {
    SetFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-white-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img src={Logo} className="w-60 h-35 mr-2 items-center" alt="logo" />
        <div className="w-full bg-gray-40 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-l font-bold leading-tight tracking-tight text-gray-700 md:text-xl ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="admin"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  autoComplete="off"
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              {isLoading ? (
                <button
                  disabled
                  type="button"
                  className="w-full text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Validating login credentials...
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Sign in
                </button>
              )}
              {isError ? <ErrorAlert message={isError} details="" /> : ''}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
