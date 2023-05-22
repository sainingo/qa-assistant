import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../GlobalContext';
import { useParams } from 'react-router-dom';
import { fetchPatientData } from './patient-resource';

const PatientBanner = () => {
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

  const profilePic = currentPatient?.person?.display?.charAt(0).toUpperCase();

  return (
    <div className="bg-gray-200 p-4 rounded-lg flex items-center">
      <div className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full mr-4">
        <span className="text-xl font-semibold">{profilePic}</span>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <h2 className="text-xl font-semibold mr-2">{currentPatient?.display}</h2>
          <p className="text-gray-600 mr-2">Gender: {currentPatient?.person?.gender}</p>
          <p className="text-gray-600">{currentPatient?.person?.age} years old</p>
        </div>
        <p className="text-gray-600">
          <strong>Preffered Address:</strong> {currentPatient?.person?.preferredAddress?.display}
        </p>
      </div>
    </div>
  );
};

export default PatientBanner;
