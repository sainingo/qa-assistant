import { useEffect, useState } from 'react';
import { deleteObservation, getPatientObservationByID, getPatientObservations } from './Observation.resource';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Header from '../../../components/layout/headers/Header';
import Sidebar from '../../../components/layout/Sidebar';
import SimpleFooter from '../../../components/layout/SimpleFooter';
import PatientBanner from '../banners/PatientBanner';
import ObsModal from './ObsModal';

const ObservationComponent = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [obs, setObs] = useState<any>([]);
  const [currentData, setCurrentData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataPerPage] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState<number>(50);
  const indexOfLastPatient = currentPage * dataPerPage;
  const indexOfFirstPatients = indexOfLastPatient - dataPerPage;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchObsID, setSearchObsID] = useState<string>('');
  const [obsData, setObsData] = useState();
  const [selectedEncounter, setSelectedEncounter] = useState('');

  useEffect(() => {
    if (uuid) {
      getPatientObservations(uuid, (currentPage - 1) * dataPerPage, pageSize)
        .then(({ results }) => {
          setObs(results);
          setLoading(true);
          if(results) {
            setCurrentData(results?.slice(indexOfFirstPatients, indexOfLastPatient))
          }
        })
        .catch((error) => {
          console.log(error);
          swal('Error', 'An error occurred while fetching observations', error);
        });
    }
  }, [uuid, currentPage, dataPerPage, pageSize]);

  const handleObsDelete = async (id: string) => {
    swal({
      title: 'Are you sure?',
      text: 'Once Deleted, you will not be able to recover this item!',
      icon: 'warning',
      buttons: ['No', 'Yes'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await deleteObservation(id);
        if (res?.status === 204) {
          swal('Poof! Your Observation has been deleted!', {
            icon: 'success',
          });
          window.location.reload();
        }
      }
    });
  };

  const totalPages = Math.ceil(obs.length / dataPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage === totalPages) {
      const newPageSize = pageSize + 50;
      setPageSize(newPageSize);
    } else {
      // Increment current page if not at the last page
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleModal = async () => {
    if (searchObsID.trim() && searchObsID !== ' ') {
      const obsSearchResult = await getPatientObservationByID(searchObsID);
      console.log(obsSearchResult);
      setSearchObsID('');
      setObsData(obsSearchResult);
      setIsOpen(!isOpen);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleKeyDown = async (e: any) => {
    if (e.key === 'Enter') {
      if (searchObsID.trim() && searchObsID !== ' ') {
        const obsSearchResult = await getPatientObservationByID(searchObsID);
        setSearchObsID('');
        if (obsSearchResult.length > 0) {
          setObsData(obsSearchResult);
          setIsOpen(!isOpen);
        } else {
          alert('No Result for that Obs ID!!');
        }
      }
    }
  };

  useEffect(() => {
    const handleFilteringByEncounter = (encounter: string) => {
      const filteredObs = obs.filter((ob: any) => {
        return ob.encounter.display === encounter;
      });
      setCurrentData(filteredObs)
    };

    handleFilteringByEncounter(selectedEncounter);
  }, [selectedEncounter]);


  if (!loading) {
    return <p className="ml-[4%] text-xl font-bold">Loading....</p>;
  }

  return (
    <>
      <PatientBanner />
      <div className="mt-[2%]  sm:w-[60%] md:w-[95%]">
        <div className="mb-4 flex">
          <input
            className="p-2 w-full border border-gray-200 outline-none rounded"
            type="text"
            placeholder="Search by Obs ID"
            value={searchObsID}
            onChange={(e) => setSearchObsID(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={toggleModal} className="px-4 py-2 ml-4 rounded bg-blue-500 text-white w-48">
            Search
          </button>
        </div>
        {obsData && <ObsModal isOpen={isOpen} closeModal={closeModal} obsData={obsData} />}
        <div className={`inline-block min-w-full shadow rounded-lg ${isOpen ? 'opacity-50' : ''}`}>
          <div className=" overflow-y-auto max-h-[32rem]">
            <table className="min-w-full leading-normal ">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Obs Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    onClick={toggleDropdown}
                    className="flex cursor-pointer hover:shadow relative px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Encounter
                    <svg
                      className="w-4 h-4 ml-2"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                    {isDropdownOpen && (
                      <div
                        id="dropdown"
                        className="z-10 absolute right-0 bg-gray-100 pl-2 shadow-lg border rounded w-44"
                      >
                        <ul className="p-2" aria-labelledby="dropdownDefaultButton">
                          {obs
                            .filter((ob: any, index: number, self: any[]) => {
                              return index === self.findIndex((o: any) => o.encounter.display === ob.encounter.display);
                            })
                            .map((ob: any, idx: number) => (
                              <li key={idx} >
                              <button onClick={() => setSelectedEncounter(ob.encounter.display)} className="cursor-pointer py-2 px-1 hover:shadow-lg">
                                {ob.encounter.display}
                              </button>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Obs
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((ob: any, index: number) => {
                  const parts = ob.display.split(':');
                  const question = parts[0].trim();
                  const answers = parts[1].split(',').map((answer: any) => answer.trim());
                  return (
                    <tr className="" key={index}>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {new Date(ob.obsDatetime).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{ob.location.display}</p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{ob.status}</p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{ob.encounter.display}</p>
                      </td>
                      <td className="px-5 py-1 border-b border-gray-200  bg-white">
                        <p className="text-gray-900 whitespace-no-wrap text-sm font-semibold">
                          <strong> QA: </strong>
                          {question}
                        </p>
                        <p className="text-sm ml-4 italic w-[80%] h-12 overflow-y-auto text-green-500 font-medium">
                          ans: {answers}
                        </p>
                      </td>
                      <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-2 py-1 font-semibold text-blue-900 leading-tight cursor-pointer">
                          <button
                            className="relative bg-blue-500 text-white py-1 px-2 rounded-sm"
                            onClick={() => handleObsDelete(ob.uuid)}
                          >
                            Void
                          </button>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            <span className="text-xs xs:text-sm text-gray-900">
              Showing {indexOfFirstPatients + 1} to {indexOfLastPatient} of {obs.length} Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                onClick={handlePrev}
                className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                onClick={handleNext}
                className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const Observation = () => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="p-4 overflow-y-auto">
            <ObservationComponent />
          </main>
          <SimpleFooter />
        </div>
      </div>
    </>
  );
};
export default Observation;
