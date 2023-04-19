import { useNavigate } from "react-router-dom";
import AdvanceFilters from "./AdvanceFilters";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

type FunctionProps = {
  searchedPatientsResult: any;
  isTrue: boolean;
  setSearchedPatientsResult: (searchedPatientsResult: any) => void;
};

const DisplayPatientResult: React.FC<FunctionProps> = ({
  searchedPatientsResult,
  setSearchedPatientsResult,
  isTrue,
}) => {
  const { currentPatient } = useContext(AppContext);

  const navigate = useNavigate();

  const handleRedirection = (id: number) => {
    currentPatient.length = 0;
    const result: Object[] = ([] = searchedPatientsResult.filter(
      (data: any) => data.uuid === id
    ));
    currentPatient.push(result);
    navigate(`/patientInfo/${id}`);
  };

  const handleFilter = (filteredPatients: object[]) => {
    if (filteredPatients) {
      setSearchedPatientsResult(filteredPatients);
    }
  };

  return (
    <>
      {searchedPatientsResult && (
        <>
          {isTrue && (
            <AdvanceFilters
              searchedPatientsResult={searchedPatientsResult}
              handleFilter={handleFilter}
            />
          )}
          <p className="ml-32 mb-2 mt-4">
            <strong>{searchedPatientsResult.length}</strong> Patients found
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
                {searchedPatientsResult.map((item: any = {}, index: number) => (
                  <tr
                    onClick={() => handleRedirection(item.person.uuid)}
                    className="bg-white border-b hover:bg-blue-400 hover:text-white hover:cursor-pointer"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">
                      {item?.identifiers[0]?.display}
                    </td>
                    <td className="px-6 py-4">{item?.person?.display}</td>
                    <td className="px-6 py-4">{item?.person?.gender}</td>
                    <td className="px-6 py-4">{item?.person?.age}</td>
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
