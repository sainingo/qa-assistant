import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Patient } from "../../types/Patient";
import { formatDate } from "../../utils/DateUtil";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import {
  fetchMoh731SyncQueue,
  processQueuedPatients,
} from "./moh-731-sync.resource";

const SearchBar: React.FC = () => {
  return (
    <>
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for items"
        />
      </div>
    </>
  );
};

const Breadcrumb = () => {
  return (
    <nav className="flex px-5 py-3" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            Home
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <a
              href="/"
              className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
            >
              MOH 731 RDE Sync
            </a>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
              PatientList
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

const handleProcessPatient = (personId: number, reportingMonth: string) => {
  const payload = {
    userId: 45,
    reportingMonth: reportingMonth,
    patientIds: [personId],
  };

  const result = processQueuedPatients(payload);
  console.log(result);
};

const Moh731SyncQueueComponent = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const navigate = useNavigate();

  const handleAddPatientsClick = () => {
    navigate("/moh-731-sync/add-patients");
  };

  useEffect(() => {
    fetchMoh731SyncQueue().then(setPatients);
  }, []);

  return (
    <>
      <Header shouldRenderSearchLink={false} />
      <div className="container m-auto">
        <Breadcrumb />
        <div className="p-4 relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between pb-4">
            <SearchBar />
            <div>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
              >
                Process All
              </button>
              <button
                type="button"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
              >
                Freeze All
              </button>
              <button
                type="button"
                onClick={handleAddPatientsClick}
                className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
              >
                Add Patients
              </button>
            </div>
          </div>

          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Patient Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Age
                </th>
                <th scope="col" className="px-6 py-3">
                  Birthdate
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Live Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Frozen Status
                </th>
                <th scope="col" className="px-6 py-3">
                  RTC Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Month
                </th>
                <th scope="col" className="px-6 py-3">
                  Queue Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-white border-b"
                      : "border-b bg-gray-50"
                  }
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {patient.patient_name}
                  </th>
                  <td className="px-6 py-4">{patient.gender}</td>
                  <td className="px-6 py-4">{patient.age}</td>
                  <td className="px-6 py-4">{formatDate(patient.birthdate)}</td>
                  <td className="px-6 py-4">{patient.clinic}</td>
                  <td className="px-6 py-4">{patient.live_status}</td>
                  <td className="px-6 py-4">{patient.frozen_status}</td>
                  <td className="px-6 py-4">{formatDate(patient.rtc_date)}</td>
                  <td className="px-6 py-4">
                    {formatDate(patient.reporting_month)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-400">
                      {patient.queue_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {patient.queue_status === "QUEUED" ? (
                      <button
                        type="button"
                        onClick={() =>
                          handleProcessPatient(
                            patient.person_id,
                            patient.reporting_month
                          )
                        }
                        className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      >
                        Process
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300"
                      >
                        Freeze
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer year={2023} />
    </>
  );
};

export default Moh731SyncQueueComponent;
