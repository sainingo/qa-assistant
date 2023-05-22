import { useContext, useEffect } from 'react';
import Sidebar from '../../../components/layout/Sidebar';
import Header from '../../../components/layout/headers/Header';
import SimpleFooter from '../../../components/layout/SimpleFooter';
import { GlobalContext } from '../../GlobalContext';
import { useParams } from 'react-router-dom';
import { fetchPatientData } from '../banners/patient-resource';

const PatientInformation = () => {
  const { currentPatient, setCurrentPatient } = useContext(GlobalContext);
  const { uuid } = useParams<{ uuid: string }>();

  useEffect(() => {
    if (uuid) {
      fetchPatientData(uuid)
        .then((data) => {
          setCurrentPatient(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [setCurrentPatient, uuid]);

  return (
    <>
      <div className="h-screen">
        {currentPatient ? (
          <>
            <div className="mx-auto sm:flex shadow" key={currentPatient?.uuid}>
              <div className="bg-hashBlue p-4 rounded sm:w-md ">
                <div className="bg-lightGray rounded-full mx-auto w-36 h-36 flex justify-center items-center">
                  <h1 className="text-9xl font-bold ">{currentPatient.person.preferredName.display[0]}</h1>
                </div>
                <div>
                  <h3 className="font-bold text-white text-center">{currentPatient.person.preferredName.display}</h3>
                </div>
              </div>
              <div
                className="grid grid-cols-1 gap-8 md:text-sm 2xl:text-lg md:grid-cols-4
                  p-8 bg-white rounded justify-between"
              >
                <div key={currentPatient.person.preferredAddress.uuid}>
                  <b>Address</b>
                  <p>{currentPatient.person.preferredAddress.display}</p>
                </div>
                <div>
                  <b>Gender</b>
                  <p>{currentPatient.person.gender}</p>
                </div>
                <div>
                  <b>Age</b>
                  <p>{currentPatient?.person.age}</p>
                </div>
                <div>
                  <b>Date of Birth</b>
                  <p>{new Date(currentPatient?.person.birthdate).toLocaleString().split(' ')[0].slice(0, -1)}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="absolute ml-[15%]">Go to search patient..</p>
        )}
      </div>
    </>
  );
};

const PatientInfo = () => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="p-4 overflow-y-auto">
            <PatientInformation />
          </main>
          <SimpleFooter />
        </div>
      </div>
    </>
  );
};

export default PatientInfo;
