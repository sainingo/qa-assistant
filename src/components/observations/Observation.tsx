import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import SideNavBar from "../SideNavBar/SideNavBar";
import { queryObservation, deleteObservation } from "./Observation.resource";
import { useParams } from "react-router-dom";
import Pagination from "../patientSearch/Pagination";
import swal from "sweetalert";

const Observation = () => {
  const { id }: any = useParams();
  const [obs, setObs] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataPerPage] = useState<number>(3);

  const indexOfLastPatient = currentPage * dataPerPage;
  const indexOfFirstPatients = indexOfLastPatient - dataPerPage;
  const currentData = obs?.slice(indexOfFirstPatients, indexOfLastPatient);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const getObs = async () => {
      const obsResult = await queryObservation(id);
      const { results } = await obsResult?.json();
      setObs(results);
    };
    getObs();
  }, [id]);

  const userInfo = obs[0]?.person?.display;

  let user_name = ''

  if(userInfo) {
    const parts = userInfo?.split('-');
    user_name = parts[1].trim().split(' ').slice(1).join(' ');
  }

  const handleObsDelete = async (id: string) => {
    swal({
      title: "Are you sure?",
      text: "Once Deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    })
    .then( async (willDelete) => {
      if (willDelete) {
        const res = await deleteObservation(id);
        if(res?.status === 204) {
          swal("Poof! Your Observation has been deleted!", {
            icon: "success",
          });
          window.location.reload();
        }
      }
    });
  }


  return (
    <div>
      <Header shouldRenderSearchLink={true} />
      <SideNavBar />
      <div className="mt-[2%] sm:ml-[30%] md:ml-[15%] sm:w-[60%] md:w-[75%]">
        <h1 className="text-xl md:text-2xl text-center font-bold underline">
          Obs for {user_name}
        </h1>
        <div className="p-4 mt-6 w-[80%] mx-auto">
          <span className="text-lg font-bold">Total Obs: {obs.length}</span>
          {currentData.map((ob: any, index: number) => {
            const parts = ob.display.split(":");
            const question = parts[0].trim();
            const answers = parts[1].split(",").map((answer: any) => answer.trim());
            return (
              <div
                key={index}
                className="p-2 rounded border-gray-300 border-b-2 mb-2 mt-2"
              >
                <ul className="flex justify-around text-sm">
                  <li>
                    Date:{" "}
                    <span className="italic font-semibold">{new Date(ob.obsDatetime).toLocaleDateString()}</span>
                  </li>
                  <li>
                    Location: <span className="text-blue-500">{ob.location.display}</span>
                  </li>
                  <li>Status: {ob.status}</li>
                  <li>
                    <button onClick={() => handleObsDelete(ob.uuid)} className="bg-blue-500 text-white py-1 px-2 rounded-sm">
                      Void
                    </button>
                  </li>
                </ul>
                <div className="m-2 pl-4 md:w-[80%] mx-auto pt-1">
                  <h3 className="p-2 sm:text-xl">
                    <span className="font-bold pr-1">QUESTION:</span> {question}{" "}
                    ?
                  </h3>
                  <div className="md:px-20 text-sm ">
                    <span className="text-green-500 font-bold pr-2">ANS: </span>
                    <ul className="max-h-16 overflow-y-auto">
                      {" "}
                      {answers.map((answer: string, index: number) => (
                        <li key={index} className="pl-8 italic">- {answer}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-4">{index + 1} .</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-[70%] mx-auto">
          {dataPerPage && (
            <Pagination
              patientsPerPage={dataPerPage}
              totalPatients={obs.length}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Observation;
