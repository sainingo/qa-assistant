import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Pagination from "../patientSearch/Pagination";
import {
  getCsvFiles,
  deleteCsvFile,
  syncCsvFile,
  updateCsvFileStatus,
} from "./csv.resource";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";

const DisplayCSV = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataPerPage] = useState<number>(5);
  const [synced, setSynced] = useState(data.map(() => false));

  const indexOfLastPatient = currentPage * dataPerPage;
  const indexOfFirstPatients = indexOfLastPatient - dataPerPage;
  const currentData =
    data.length > 0 && data?.slice(indexOfFirstPatients, indexOfLastPatient);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchCsvFiles = async () => {
      const res = await getCsvFiles();
      if (res) {
        const response = await res.json();
        setData(response);
      } else {
        console.log("Unable to fetch csv files");
      }
    };

    fetchCsvFiles();
  }, []);

  interface CsvFile {
    file_name: string;
    upload_time: Date;
    status: string;
    total_records: number;
    existing_records: number;
    failed: number;
    successful: number;
    file_type: string;
    id: number;
    eid_file_upload_metadata_id: number;
  }

  const handleVoidedCsv = async (id: number) => {
    const voidedCsv = data.filter((item: CsvFile) => item.id !== id);
    setData(voidedCsv);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await deleteCsvFile(id);
          const response = await res.json();
          if (response.affectedRows === 1) {
            toast.success("File deleted successfully");
            setTimeout(() => {
              window.location.reload();
            }, 6000);
          } else {
            toast.error("Unable to delete file");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleCsvSync = (id: number) => {
    const [result]: any = data.filter(
      (item: CsvFile) => item.eid_file_upload_metadata_id === id
    );
    const filePath = result.path_to_file;
    const index = filePath.indexOf("uploads");
    const relativePath = filePath.slice(index + "uploads".length);

    // check if status is updated
    if (result.status === "synced") {
      alert("File already synced");
      return;
    }

    swal({
      title: "Are you sure?",
      text: "Once synced, you will not be able to recover this item!",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await syncCsvFile(relativePath);
        const response = await res.json();
        setSynced((prevStates) => {
          const newStates = [...prevStates];
          newStates[id] = true;
          return newStates;
        });
        toast.success(response.message);
        console.log(response);
        // update status
        const status = {
          status: "synced",
          successful: result.total_records,
          eid_file_upload_metadata_id: id,
        };

        const updateStatus = await updateCsvFileStatus(status);
        const updateStatusResponse = await updateStatus.json();
        console.log(updateStatusResponse);
        if (updateStatusResponse.affectedRows === 1) {
          // toast.success('Status updated successfully');
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      }
    });
  };

  return (
    <div className="w-[70%] mx-auto mt-12">
      <ToastContainer />
      <div>
        {currentData ? (
          <>
            <span className="text-xl font-bold pb-4">
              Total Files: {data.length}
            </span>
            <div className="overflow-x-auto shadow-md">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-white uppercase bg-blue-900/80">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      File Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Uploaded Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Uploaded time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Already Synced
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Failed
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Successful
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item: CsvFile, idx) => (
                    <>
                      <tr className={`${item.status === 'synced' ? "bg-gray-50 border-b opacity-75 font-medium" : "bg-white border-b"}`} key={idx}>
                        <td className="px-6 py-4">{item.file_name}</td>
                        <td className="px-6 py-4">
                          {new Date(item.upload_time).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(item.upload_time).toLocaleTimeString()}
                        </td>
                        <td className={`${item.status === 'synced' ? "px-6 py-4 text-green-600" : "px-6 py-4"}`}>{item.status}</td>
                        <td className="px-6 py-4">{item.total_records}</td>
                        <td className="px-6 py-4">{item.existing_records}</td>
                        <td className="px-6 py-4">{item.failed}</td>
                        <td className="px-6 py-4">{item.successful}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`${
                              item.file_type == "VL"
                                ? "bg-green-500 p-1 text-white"
                                : "bg-btnColor p-1 text-white"
                            }`}
                          >
                            {item.file_type}
                          </span>
                        </td>
                        <td className="px-3 py-2 flex items-center gap-3">
                          <button
                            onClick={() =>
                              handleCsvSync(item.eid_file_upload_metadata_id)
                            }
                            className={`${
                              item.status !== "synced"
                                ? "bg-blue-400 p-2 rounded-md cursor-pointer text-white"
                                : "bg-gray-200 p-2 rounded-md text-black font-light opacity-50 cursor-not-allowed"
                            }`}
                          >
                            SYNC
                          </button>
                          <span
                            onClick={() =>
                              handleVoidedCsv(item.eid_file_upload_metadata_id)
                            }
                            className={`${
                              item.status !== "synced"
                                ? "text-2xl text-red-900/90 cursor-pointer"
                                : "hidden"
                            }`}
                          >
                            <MdDelete />
                          </span>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-xl">No files uploaded</p>
        )}
        {dataPerPage && (
          <Pagination
            patientsPerPage={dataPerPage}
            totalPatients={data.length}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
};

export default DisplayCSV;
