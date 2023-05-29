import React, { useState, useContext } from 'react';
import { RiFlaskLine, RiHome2Line, RiListCheck2 } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import logo from '../../public/ampath-logo.png';
import { GlobalContext } from '../../app/GlobalContext';

const Sidebar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentPatient } = useContext(GlobalContext);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-200 w-64 flex-shrink-0">
      <div className="flex justify-between items-center p-4">
        <span className="cursor-pointer ml-3">
          <Link to="/">
            <img src={logo} alt="AMPATH Logo" />
          </Link>
        </span>
        <button className="p-2 rounded-md md:hidden" onClick={handleMenuToggle}>
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
              <path
                fillRule="evenodd"
                d="M4 4a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm0 6a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm0 6a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
              <path
                fillRule="evenodd"
                d="M4 5h12a1 1 0 010 2H4a1 1 0 010-2zm0 5h12a1 1 0 010 2H4a1 1 0 010-2zm0 5h12a1 1 0 010 2H4a1 1 0 010-2z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      <nav className={`p-4 ${isMenuOpen ? '' : 'hidden'} md:block`}>
        <ul>
          <li>
            <Link
              to={`/patient-dashboard/${currentPatient?.uuid}`}
              className="block py-2 px-4 rounded-md text-gray-700 hover:bg-gray-300"
            >
              <RiHome2Line className="inline-block mr-2" />
              Patient Info
            </Link>
          </li>
          <li>
            <Link
              to={`/patient-dashboard/${currentPatient?.uuid}/orders`}
              className="block py-2 px-4 rounded-md text-gray-700 hover:bg-gray-300"
            >
              <RiFlaskLine className="inline-block mr-2" />
              Orders
            </Link>
          </li>
          <li>
            <Link
              to={`/patient-dashboard/${currentPatient?.uuid}/observations`}
              className="block py-2 px-4 rounded-md text-gray-700 hover:bg-gray-300"
            >
              <RiListCheck2 className="inline-block mr-2" />
              Observations
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
