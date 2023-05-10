import csv_image from '../../public/csv-icon.png';
import { useEffect, useState } from 'react';
import { CsvUploadData, uploadCsvFile } from './csv.resource';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import storage from '../../app/localStorage';
import DisplayCSV from './DisplayCSV';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const CsvUpload = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [reloadState, setReloadState] = useState(false);

  const onChangeHandler = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const { user } = storage.loadData();

  interface CsvFileInfo {
    numRows: number;
    file_type: string;
  }

  function handleReadFile(file: any): Promise<CsvFileInfo> {
    return new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            // Parse the CSV data
            const rows = (reader.result as string).split('\n');
            const headers = rows[0].split(',');
            const rowData = rows.slice(1).map((row) => row.split(','));
            const csvData = rowData
              .filter((row) => row.some((cell) => cell.trim() !== '')) // exclude empty rows
              .map((row) =>
                headers.reduce((obj: { [key: string]: any }, key, i) => {
                  obj[key] = row[i];
                  return obj;
                }, {}),
              );
            // Check if the file contains the columns "Lab Viral Load" or "CD4_Count"
            console.log(headers.includes('"CD4 abs"'));
            let file_type = '';
            if (headers.includes('Lab Viral Load') && fileType === 'VL') {
              file_type = 'VL';
            } else if (headers.includes('"CD4 abs"') && fileType === 'CD4') {
              file_type = 'CD4';
            } else if (!headers.includes('Lab Viral Load') && !headers.includes('"CD4 abs"')) {
              toast.error('File does not contain the required columns');
              return reject();
            } else if (headers.includes('Lab Viral Load') && fileType !== 'VL') {
              toast.error('File selected is not a CD4 file');
              return reject();
            } else if (headers.includes('"CD4 abs"') && fileType !== 'CD4') {
              toast.error('File selected is not a VL file');
              return reject();
            } else if (fileType === '') {
              toast.error('Please select the file type');
              return reject();
            } else {
              toast.error('File does not contain the required columns or file type is incorrect');
              return reject();
            }

            // Resolve the Promise with the total number of records and the file type
            resolve({ numRows: csvData.length, file_type });
          }
        };
        reader.onerror = reject;
        reader.readAsText(file);
      } else {
        toast.error('No file selected');
        return reject();
      }
    });
  }

  const onClickCsvUploadHandler = async () => {
    try {
      const { numRows, file_type } = await handleReadFile(csvFile);

      const data: CsvUploadData = {
        file: csvFile,
        username: user.display,
        file_type: file_type,
        total_records: numRows,
      };
      setFileType('');
      const res = await uploadCsvFile(data);
      const response = await res.json();
      console.log(response);

      // use toast to display message
      if (response.status === 'success') {
        toast.success(response.message);
        setReloadState(true);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //set timeout to reload page
    if (reloadState) {
      window.location.reload();
    }
  }, [reloadState]);

  const Breadcrumb = () => {
    return (
      <nav className="bg-themeColor flex px-5 py-3" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
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
              <a href="/" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                lab-results-sync
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
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">csv-upload</span>
            </div>
          </li>
        </ol>
      </nav>
    );
  };

  return (
    <>
      <Header shouldRenderSearchLink={false} />
      <ToastContainer hideProgressBar={true} theme="colored" />
      <Breadcrumb />
      <div className="bg-themeColor h-[90vh]">
        <div className="relative flex justify-center">
          <div className="text-white w-[70%] mt-10 md:flex p-4 gap-8 items-center rounded-lg shadow-lg bg-gray-500">
            <div className="flex justify-center">
              <img alt='csv upload' src={csv_image} width={180} />
            </div>
            <div>
              <div className="py-4">
                <h2 className="text-2xl text-center md:text-left">Upload CSV</h2>
                <p className="md:text-lg">Load your data by selecting a CSV file type below</p>
              </div>
              <div className="grid gap-4 md:p-2 md:flex md:items-center md:gap-4">
                <input type="file" name="file" onChange={onChangeHandler} />
                <label htmlFor='type' className="px-2 text-md font-semibold">Choose CSV type:</label>
                <select
                  className="p-3 outline-none bg-themeColor text-black"
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                >
                  <option value="">file type:</option>
                  <option value="VL">VL</option>
                  <option value="CD4">CD4</option>
                </select>
                <button className="bg-blue-500 p-3 rounded-lg text-white" onClick={onClickCsvUploadHandler}>
                  Upload CSV
                </button>
              </div>
            </div>
          </div>
        </div>
        <DisplayCSV />
        <div className="hidden md:block mt-9">
          <Footer year={2023} />
        </div>
      </div>
    </>
  );
};

export default CsvUpload;
