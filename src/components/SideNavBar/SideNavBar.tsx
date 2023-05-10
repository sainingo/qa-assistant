import { useContext } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import { FaWalking, FaRegCalendarAlt } from 'react-icons/fa';
import { BiBandAid } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const SideNavBar = () => {
  const activeStyle = {
    color: '#2FBAF1',
    cursor: 'pointer',
  };

  const { currentPatient } = useContext(AppContext);

  const patientId = currentPatient.map((info: any = {}) => {
    return info[0].uuid;
  });

  return (
    <div className="hidden md:block absolute bg-white h-screen pl-[2%] shadow-lg">
      <nav className="mt-20">
        <ul className="flex flex-col gap-10 text-xl mr-2">
          <NavLink to={`/patientInfo/${patientId}`} style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <li className="py-2 px-4 flex gap-2 items-center hover:cursor-pointer hover:shadow-md">
              <span>
                <AiOutlineInfoCircle />{' '}
              </span>
              Patients Info
            </li>
          </NavLink>
          <NavLink to={`/patient/${patientId}/orders`} style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <li className="py-2 px-4 flex gap-2 items-center hover:cursor-pointer hover:shadow-md">
              <BsPencilSquare />
              Orders
            </li>
          </NavLink>
          <NavLink to="/visits" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <li className="py-2 px-4 flex gap-2 items-center hover:cursor-pointer hover:shadow-md">
              <FaWalking />
              Visits
            </li>
          </NavLink>
          <NavLink to="/encounters" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <li className="py-2 px-4 flex gap-2 items-center hover:cursor-pointer hover:shadow-md">
              <BiBandAid />
              Encounters
            </li>
          </NavLink>
          <NavLink to={`/observations/${patientId}`} style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <li className="py-2 px-4 flex gap-2 items-center hover:cursor-pointer hover:shadow-md">
              <FaRegCalendarAlt />
              Observations
            </li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};
export default SideNavBar;
