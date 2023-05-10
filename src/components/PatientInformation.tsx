import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Header from './layout/Header';
import SideNavBar from './SideNavBar/SideNavBar';

const PatientInformation = () => {
  const { currentPatient } = useContext(AppContext);
  return (
    <>
      <Header shouldRenderSearchLink={true} />
      <SideNavBar />
      <div className="bg-lightGray h-screen">
      <>
              <div className="sm:w-[85%] mx-auto sm:flex pt-8 lg:ml-[20%] ">
                <div className="bg-hashBlue p-4 rounded sm:w-md ">
                  <div className="bg-lightGray rounded-full mx-auto w-36 h-36 flex justify-center items-center">
                    <h1 className="text-9xl font-bold ">{currentPatient?.preferredName?.display?.[0]}</h1>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-center">{currentPatient?.preferredName?.display}</h3>
                  </div>
                </div>
                <div
                  className="grid grid-cols-1 gap-8 md:text-sm 2xl:text-lg md:grid-cols-4
                  p-8 bg-white rounded md:w-[75%] justify-between"
                >
                  <div >
                    <b>Address</b>
                    <p>{currentPatient?.preferredAddress?.display}</p>
                  </div>
                  <div>
                    <b>Gender</b>
                    <p>{currentPatient?.gender}</p>
                  </div>
                  <div>
                    <b>Age</b>
                    <p>{currentPatient?.age}</p>
                  </div>
                  <div>
                    <b>Date of Birth</b>
                    <p>{currentPatient?.birthdate}</p>
                  </div>
                </div>
              </div>
            </>
      </div>
    </>
  );
};

export default PatientInformation;
