import { useNavigate } from "react-router-dom";
import AdvanceFilters from "./AdvanceFilters";
import {  useContext, useEffect, useState } from "react";
import { AppContext } from '../context/AppContext'

type FunctionProps = {
  handleAdvancedFiltering: () => any;
  patients: any;
  isTrue: boolean
}

const DisplayPatientResult: React.FC<FunctionProps> = ({patients, handleAdvancedFiltering, isTrue}) => {
    const { patientData } = useContext(AppContext)

    const navigate = useNavigate()
    const [patientsData, setPatientsData] = useState([])
    // const [info, setInfo] = useState([])

    useEffect(() => {

      setPatientsData(patients)

    }, [])


    const handleRedirection = (id: number) => {
        patientData.length = 0;
        const result: any = [] = patients.filter((data: any) => data.uuid === id)
        if(patientData.length < 1) {
            patientData.push(result as never)
        }
        navigate(`/patients/${id}`)
    }

    const handleFilter = (filteredPatients: {}) => {
      if(filteredPatients) {
        setPatientsData(filteredPatients as any)
      }
     
  }



      return (
        <>
    {patientsData && (
      <>
      {isTrue && <AdvanceFilters handleAdvancedFiltering={handleAdvancedFiltering}
                                                    handleFilter={handleFilter}/>}
      <p className="ml-32 mb-2 mt-4"><strong>{patientsData.length}</strong> Patients found</p>
      <div className="md:ml-32 relative overflow-x-auto shadow-md sm:rounded-lg md:w-[90%] md:mx-auto mt-8">
         <table className=" lg:w-full mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
          {patientsData.map((item: any = {}, index: number) => (
                         <tr onClick={() => handleRedirection(item.person.uuid)} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-blue-400 hover:text-white hover:cursor-pointer" key={index}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {index + 1}
                            </th>
                            <td className="px-6 py-4">
                            {item?.identifiers[0]?.display}
                            </td>
                            <td className="px-6 py-4">
                            {item?.person?.display}
                            </td>
                            <td className="px-6 py-4">
                            {item?.person?.gender}
                            </td>
                            <td className="px-6 py-4">
                            {item?.person?.age}
                            </td>
                        </tr>
          ))}
          
          </tbody>
      </table>
  </div>

      </>
 
    )}
      </>
      );
}

export default DisplayPatientResult