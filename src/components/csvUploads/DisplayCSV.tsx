import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';

import { getCsvFiles, deleteCsvFile, syncCsvFile, getErrorLogs } from './csv.resource';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';
import storage from '../../app/localStorage';
import Pagination from '../pagination/Pagination';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const DisplayCSV = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataPerPage] = useState<number>(5);
  const [synced, setSynced] = useState(data.map(() => false));
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [logs, setLogs] = useState([]);
  const [reloadState, setReloadState] = useState(false);

  const indexOfLastPatient = currentPage * dataPerPage;
  const indexOfFirstPatients = indexOfLastPatient - dataPerPage;
  const currentData = data.length > 0 && data?.slice(indexOfFirstPatients, indexOfLastPatient);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const { user } = storage.loadData();

  useEffect(() => {
    const fetchCsvFiles = async () => {
      const res = await getCsvFiles(user.display);
      if (res) {
        const response = await res.json();
        setData(response);
      } else {
        console.log('Unable to fetch csv files');
      }
    };

    fetchCsvFiles();
  }, [user.display, synced]);

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

  function ModalPop() {
    function closeModal() {
      setIsOpen(false);
    }

    return (
      <div>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
          <div className="relative w-full">
            <button className="absolute right-0 top-0 text-2xl" onClick={closeModal}>
              <AiOutlineClose />
            </button>
            <div className="w-full p-4">
              <h1 className="text-xl font-bold text-red-600 underline">Error Logs</h1>
              <ul className="p-4">
                {logs &&
                  logs.map((log: any, idx) => {
                    const parsedLog = JSON.parse(log);
                    return (
                      <li key={idx} className="text-sm text-gray-600 border-spacing-2 p-2">
                        <span>{idx + 1}. </span>
                        {parsedLog.message}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  const handleVoidedCsv = async (id: number) => {
    const voidedCsv = data.filter((item: CsvFile) => item.id !== id);
    setData(voidedCsv);
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this item!',
      icon: 'warning',
      buttons: ['No', 'Yes'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await deleteCsvFile(id);
          const response = await res.json();
          if (response.affectedRows === 1) {
            toast.success('File deleted successfully');
            setReloadState(true);
            if (reloadState) {
              window.location.reload();
            }
          } else {
            toast.error('Unable to delete file');
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleCsvSync = (id: number) => {
    const [result]: any = data.filter((item: CsvFile) => item.eid_file_upload_metadata_id === id);
    const filePath = result.path_to_file;
    const index = filePath.indexOf('uploads');
    const relativePath = filePath.slice(index + 'uploads'.length);

    // check if status is updated
    if (result.status === 'synced') {
      alert('File already synced');
      return;
    }

    swal({
      title: 'Are you sure?',
      text: 'Once synced, you will not be able to recover this item!',
      icon: 'warning',
      buttons: ['No', 'Yes'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await syncCsvFile(relativePath);
        const response = await res.json();
        setSynced((prevStates: any) => {
          const newStates = [...prevStates];
          newStates[id] = true;
          return newStates;
        });
        toast.success(response.message);
        setReloadState(true);
      }
      if (reloadState) {
        window.location.reload();
      }
    });
  };

  const handleFileSearch = (e: any) => {
    if (e.keyCode === 13) {
      const searchValue = e.target.value;
      const filteredData = data.filter((item: CsvFile) =>
        item.file_type.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setData(filteredData);
    }
  };

  const handleLogs = async (file_name: string) => {
    setIsOpen(true);
    const getLogs = await getErrorLogs(file_name);
    const response = await getLogs?.json();
    setLogs(response);
  };
  return (
    <div className="w-[70%] mx-auto mt-12">
      <ToastContainer />
      <ModalPop />
      <div>
        {currentData ? (
          <>
            <div className="md:flex justify-between mb-2">
              <span className="md:text-xl md:font-bold pb-4">Total Files: {data.length}</span>
              <div>
                <input
                  onKeyDown={handleFileSearch}
                  type="text"
                  className="w-[50%] md:w-full h-10 border outline-none border-gray-300 rounded-md pl-2"
                  placeholder="Search by file type"
                />
              </div>
            </div>
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
                      Exists
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
                      <tr
                        className={`${
                          item.status === 'synced' ? 'bg-[#DDEBF7] border-b font-bold' : 'bg-white border-b'
                        }`}
                        key={idx}
                      >
                        <td className="px-6 py-4">{item.file_name}</td>
                        <td className="px-6 py-4">{new Date(item.upload_time).toLocaleDateString()}</td>
                        <td className="px-6 py-4">{new Date(item.upload_time).toLocaleTimeString()}</td>
                        <td
                          onClick={item.status === 'Error' ? () => handleLogs(item.file_name) : undefined}
                          onKeyDown={
                            item.status === 'Error'
                              ? (event) => {
                                  if (event.key === 'Enter' || event.key === ' ') {
                                    handleLogs(item.file_name);
                                  }
                                }
                              : undefined
                          }
                          className={`${
                            item.status === 'synced'
                              ? 'px-4 py-4 text-[#198754] cursor-pointer'
                              : item.status === 'Error'
                              ? 'text-red-700 font-bold cursor-pointer px-6 py-4'
                              : 'text-[#ffc107] px-6 py-4 cursor-pointer'
                          }`}
                        >
                          {item.status}
                        </td>

                        <td className="px-6 py-4">{item.total_records}</td>
                        <td className="px-6 py-4">{item.existing_records}</td>
                        <td className="px-6 py-4">{item.failed}</td>
                        <td className="px-6 py-4">{item.successful}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`${
                              item.file_type == 'VL' ? 'bg-green-500 p-1 text-white' : 'bg-btnColor p-1 text-white'
                            }`}
                          >
                            {item.file_type}
                          </span>
                        </td>
                        <td className="px-3 py-2 flex items-center gap-3">
                          <div>
                            <button
                              onClick={() => handleCsvSync(item.eid_file_upload_metadata_id)}
                              className={`${
                                item.status == 'synced'
                                  ? 'bg-green-400 p-1 rounded-md text-sm text-white font-light cursor-not-allowed'
                                  : item.status === 'Error'
                                  ? 'bg-red-400 p-1 rounded-md text-sm text-white font-light cursor-not-allowed'
                                  : 'bg-blue-400 p-1 text-sm rounded-md cursor-pointer text-white'
                              }`}
                            >
                              {item.status !== 'synced' && item.status !== 'Error' ? 'Sync' : 'Synced'}
                            </button>
                          </div>
                          <button
                            onClick={() => handleVoidedCsv(item.eid_file_upload_metadata_id)}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                handleVoidedCsv(item.eid_file_upload_metadata_id);
                              }
                            }}
                            className={`${
                              item.status !== 'synced' ? 'text-2xl text-red-900/90 cursor-pointer' : 'hidden'
                            }`}
                          >
                            <MdDelete />
                          </button>
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
        {dataPerPage && <Pagination patientsPerPage={dataPerPage} totalPatients={data.length} paginate={paginate} />}
      </div>
    </div>
  );
};

export default DisplayCSV;
