import { useContext, useEffect, useState } from 'react';
import DisplayPatientResult from './DisplayPatientResult';
import Pagination from './Pagination';
import ClipLoader from 'react-spinners/ClipLoader';
import { IoFilterSharp } from 'react-icons/io5';
import { searchPatient } from './PatientSearch.resource';
import Header from '../layout/Header';

interface Result {
  newData: [];
}
const PatientSearch = () => {
  // const [patientInfo, setPatientInfo] = useState<any>([])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [patientsPerPage] = useState<number>(5);
  const [searchParams, setSearchParams] = useState<string>('');
  const [Loading, isLoading] = useState(false);
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const [searchedPatientsResult, setSearchedPatientsResult] = useState<[]>([]);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatients = indexOfLastPatient - patientsPerPage;
  const currentPatients = searchedPatientsResult.slice(indexOfFirstPatients, indexOfLastPatient);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSubmit = async () => {
    if (searchParams.trim() && searchParams !== '') {
      isLoading(true);
      const result = await searchPatient(searchParams);
      setSearchParams('');
      isLoading(false);
      setSearchedPatientsResult(result);
    }
  };

  const handleOpenFilters = () => {
    setIsTrue(!isTrue);
  };

  return (
    <>
      <Header shouldRenderSearchLink={false} />
      <div className="bg-themeColor overflow-y-auto h-screen pt-10">
        <div className="w-[80%] mx-auto">
          <div className="w-[90%] mx-auto">
            <div className="md:flex gap-10 m-4 mx-auto w-[95%] md:ml-20">
              <input
                className="py-2 px-4 md:w-[60%] w-full outline-none rounded-xl shadow-lg"
                type="text"
                placeholder="Search patient by name"
                value={searchParams}
                onChange={(e) => setSearchParams(e.target.value)}
              />
              <div className="flex md:gap-11 gap-3 mt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-800/70 md:text-lg text-white py-2 px-12 rounded-xl hover:bg-white border hover:border-blue-800/70 hover:text-blue-800/70"
                >
                  Search
                </button>
                <button
                  onClick={() => setSearchParams('')}
                  className="bg-slate-50 md:text-lg text-red-600 border hover:border-red-500 hover:font-bold border-gray-300 py-2 px-12 rounded-xl"
                >
                  Reset
                </button>
                <button
                  onClick={handleOpenFilters}
                  className="bg-gray-3c00 md:text-lg flex items-center gap-2 hover:font-bold border-gray-300 py-1 px-4 rounded"
                >
                  <IoFilterSharp />
                  Filters
                </button>
              </div>
            </div>
          </div>
          {Loading ? (
            <div className="flex items-center ml-[15%] p-4 mt-4 text-2xl">
              <ClipLoader size={50} color="blue" />
            </div>
          ) : (
            <>
              {searchedPatientsResult && searchedPatientsResult.length < 1 ? (
                <p className="text-lg ml-8">Search for a patient here</p>
              ) : (
                <div>
                  <>
                    <DisplayPatientResult
                      setSearchedPatientsResult={setSearchedPatientsResult}
                      searchedPatientsResult={currentPatients}
                      isTrue={isTrue}
                    />
                    {patientsPerPage > 5 && (
                      <Pagination
                        patientsPerPage={patientsPerPage}
                        totalPatients={searchedPatientsResult.length}
                        paginate={paginate}
                      />
                    )}
                  </>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default PatientSearch;
