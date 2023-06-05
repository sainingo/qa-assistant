import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import storage from '../localStorage';
import { FaPlus } from 'react-icons/fa';
import Header from '../../components/layout/headers/HeaderWithLogo';
import Footer from '../../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { queuePatients } from './AddPatients.resource';
import ErrorToast from '../../components/toasts/ErrorToast';
import SuccessToast from '../../components/toasts/SuccessToast';
import CalendarComponent from '../../components/calendar/Calendar';
import { RequestBody } from './Model';
import { formatDateToLastDayOfMonth } from './Moh731Sync.resource';

const AddPatientIdentifier = () => {
  const [patientIdentifier, setPatientIdentifier] = useState({
    identifier: '',
  });
  const [identifiers, setIdentifiers] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reportingMonth, setReportingMonth] = useState<Date>(new Date(2020, 0)); // January 2020
  const [responseBody, setResponseBody] = useState<{ affectedRows: number; existingPatients: string[] }>({
    affectedRows: 0,
    existingPatients: [],
  });

  const navigate = useNavigate();

  const { identifier } = patientIdentifier;

  const onChange = (e: { target: { name: string; value: string } }) => {
    setPatientIdentifier({
      ...patientIdentifier,
      [e.target.name]: e.target.value,
    });
  };

  const tabulateIdentifier = () => {
    const identifierInput = document.getElementById('identifier') as HTMLInputElement;
    if (identifierInput.value.length > 0) {
      //remove duplicates
      const formatIdentifiers = new Set(identifier.split(','));
      const newIdentifiers = Array.from(formatIdentifiers).filter((id) => !identifiers.includes(id));
      setIdentifiers([...identifiers, ...newIdentifiers]);
      if (identifierInput) {
        identifierInput.value = '';
      }
    } else {
      return;
    }
  };

  const handleMonthChange = (value: Date) => {
    setReportingMonth(value);
  };

  const deleteIdentifier = (id: string) => {
    setIdentifiers(identifiers.filter((existing) => existing !== id));
  };

  const handleSubmit = async () => {
    try {
      const { user } = storage.loadData();
      const userId = user.uuid;

      const fullReportingMonth = formatDateToLastDayOfMonth(reportingMonth);

      const requestBody: RequestBody = {
        identifiers: identifiers,
        userId: userId,
        reportingMonth: fullReportingMonth,
      };

      const response = await queuePatients(requestBody);

      if (response.ok) {
        const data = await response.json();
        setResponseBody(data);
        setIsSuccess(true);
        setIdentifiers([]);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };
  return (
    <>
      <Header />
      <div className="grid gap-x-4 grid-cols-1 lg:grid-cols-2 justify-center w-11/12 mx-auto ">
        <div className="pl-10 md:px-32 lg:pl-10 xl:pl-24 2xl:pl-60 mt-10 shadow-lg pb-4">
          <CalendarComponent selectedMonth={reportingMonth} handleMonthChange={handleMonthChange} />
          <div className="mt-10">
            <h2 className="text-xl">Add identifier(s):</h2>
            <div className="mt-2">
              <textarea
                id="identifier"
                name="identifier"
                onChange={onChange}
                placeholder="Add indentifier(s) here..."
                className="p-2.5 w-full sm:w-96 h-48 bg-gray-50 rounded-lg border border-gray-300"
              ></textarea>
            </div>
            <div className="mt-10 ml-72">
              <button
                onClick={tabulateIdentifier}
                className="bg-blue-500 text-white hover:bg-blue-600 hover:font-bold py-2 px-5 rounded-lg flex justify-around items-center "
              >
                <FaPlus className="ml-1" /> Add
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 shadow-lg mr-60 w-full">
          <div className="pt-2">
            <table className="w-11/12 mx-10 lg:mx-auto">
              <thead className="uppercase bg-gray-200">
                <tr className="w-full">
                  <th className="px-4 py-2 text-black">Count</th>
                  <th className="px-4 py-2 text-black">Identifier</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {identifiers.map((id, index) => (
                  <tr key={index} className="bg-gray-100 hover:bg-gray-300 ">
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2 text-center">{id}</td>
                    <td className="px-4 py-2 text-center">
                      <button className="text-red-600 hover:text-red-800" onClick={() => deleteIdentifier(id)}>
                        <AiOutlineDelete size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid justify-items-end mr-9 mt-5">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white hover:bg-blue-600 hover:font-bold py-2 px-5 rounded-lg"
            >
              Submit
            </button>
          </div>
          {isSuccess && (
            <div className="fixed flex items-end justify-end right-4 bottom-4 sm:right-10 sm:bottom-20 z-50 md:z-0">
              <div className="w-4/6 md:w-full md:max-w-sm bg-blue-400 rounded-lg p-6 shadow-lg relative">
                <button
                  className="absolute top-0 right-0 m-2 text-black hover:text-gray-700"
                  onClick={() => setIsSuccess(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <p className="text-lg mb-2">
                  <span className="font-bold">Successfully added identifiers:</span>{' '}
                  <span className="text-lg">{responseBody.affectedRows}</span>
                </p>
                {responseBody.existingPatients.length > 0 && (
                  <p className="text-lg mb-2">
                    <span className="font-bold">Existing identifiers for current reporting month:</span>{' '}
                    <span className="text-lg">{responseBody.existingPatients.join(', ')}</span>
                  </p>
                )}
              </div>
            </div>
          )}
          {isSuccess && (
            <div className="pl-40 mt-4 z-50">
              <SuccessToast
                message="Identifiers have been added successfully"
                handleOnClick={() => setIsSuccess(false)}
              />
            </div>
          )}
          {isError && (
            <div className="pl-40 mt-4">
              <ErrorToast
                message="An error ocurred while adding identifiers, please try again"
                handleOnClick={() => setIsError(false)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="grid justify-items-end mr-9 mt-5">
        <button
          className="bg-blue-500 text-white hover:bg-blue-600 hover:font-bold py-2 px-5 rounded-lg mr-5"
          onClick={() => navigate('/moh-731-sync')}
        >
          Back to patient list
        </button>
      </div>
      <Footer />
    </>
  );
};

export default AddPatientIdentifier;
