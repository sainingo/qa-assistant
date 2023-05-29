import { useNavigate } from 'react-router-dom';
import AdvanceFilters from './AdvanceFilters';
import { Patient } from '../types/Patient';
import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';

interface SearchPatientProps {
  patients: Patient[];
  isTrue: boolean;
}

const DisplayPatientResult: React.FC<SearchPatientProps> = ({ patients, isTrue }: SearchPatientProps) => {
  const { setCurrentPatient } = useContext(GlobalContext);
  const navigate = useNavigate();

  const getSelectedPatient = (uuid: string): Patient => {
    const patient = patients.find((patient) => patient.uuid === uuid);
    if (patient) {
      return patient;
    } else {
      return {} as Patient;
    }
  };

  const handleRedirection = (uuid: string) => {
    setCurrentPatient(getSelectedPatient(uuid));
    navigate(`/patient-dashboard/${uuid}`);
  };

  const handleFilter = (filteredPatients: Patient[]): void => {
    if (filteredPatients) {
      patients.push(...filteredPatients);
    }
  };

  return (
    <>
      {patients && (
        <>
          {isTrue && <AdvanceFilters patients={patients} handleFilter={handleFilter} />}
          <p className="ml-32 mb-2 mt-4">
            <strong>{patients.length}</strong> Patients found
          </p>
          <div className="md:ml-32 relative overflow-x-auto shadow-md sm:rounded-lg md:w-[90%] md:mx-auto mt-8">
            <table className=" lg:w-full mx-auto text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Uuid No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Identifiers
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Patient Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Gender
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Age
                  </th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient: Patient, index: number) => (
                  <tr
                    onClick={() => handleRedirection(patient?.person.uuid)}
                    className="bg-white border-b hover:bg-blue-400 hover:text-white hover:cursor-pointer"
                    key={index}
                  >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{patient?.identifiers[0]?.display}</td>
                    <td className="px-6 py-4">{patient?.person?.display}</td>
                    <td className="px-6 py-4">{patient?.person?.gender}</td>
                    <td className="px-6 py-4">{patient?.person?.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default DisplayPatientResult;
