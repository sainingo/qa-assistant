import Header from "../Header/Header";
import csv_image from "../../public/csv-icon.png";
import { useState } from "react";
import { CsvUploadData, uploadCsvFile } from "./csv.resource";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import storage from "../../app/localStorage";
import DisplayCSV from "./DisplayCSV";

const CsvUpload = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [fileType, setFileType] = useState("");

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
            const rows = (reader.result as string).split("\n");
            const headers = rows[0].split(",");
            const rowData = rows.slice(1).map((row) => row.split(","));
            const csvData = rowData
              .filter((row) => row.some((cell) => cell.trim() !== "")) // exclude empty rows
              .map((row) =>
                headers.reduce((obj: { [key: string]: any }, key, i) => {
                  obj[key] = row[i];
                  return obj;
                }, {})
              );
                // Check if the file contains the columns "Lab Viral Load" or "CD4_Count"
          let file_type = '';
          if (headers.includes('Lab Viral Load') && fileType === 'VL') {
            file_type = 'VL';
          } else if (headers.includes('CD4_Count') && fileType === 'CD4') {
            file_type = 'CD4';
          }  else if (!headers.includes('Lab Viral Load') && !headers.includes('CD4_Count')){
            toast.error('File does not contain the required columns');
            return reject();
          } else if (headers.includes('Lab Viral Load') && fileType !== 'VL')  {
            toast.error('File selected is not a CD4 file');
            return reject();
          } else if (headers.includes('CD4_Count') && fileType !== 'CD4') {
            toast.error('File selected is not a VL file');
            return reject();
          } else if(fileType === '') {
            toast.error('Please select the file type');
            return reject();
          }
          else {
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
        toast.error("No file selected");
        return reject();
      }
    });
  }

  const onClickCsvUploadHandler = async () => {
    try {
      const {numRows, file_type} = await handleReadFile(csvFile);

      const data: CsvUploadData = {
        file: csvFile,
        username: user.display,
        file_type: file_type,
        total_records: numRows,
      };
      setFileType("");
      const res = await uploadCsvFile(data);
      const response = await res.json();
        console.log(response);

      // use toast to display message
      if (response.status === "success") {
        //set timeout to reload page
        toast.success(response.message);
        setTimeout(() => {
          window.location.reload();
        }, 6000);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header shouldRenderSearchLink={false} />
      <ToastContainer hideProgressBar={true} theme="colored" />
      <div className="bg-themeColor h-screen">
        <div className="relative flex justify-center">
          <div className="text-white w-[70%] mt-10 md:flex p-4 gap-8 items-center rounded-lg shadow-lg bg-gray-500">
            <div className="flex justify-center">
              <img src={csv_image} width={180} />
            </div>
            <div>
              <div className="py-4">
                <h2 className="text-2xl text-center md:text-left">
                  Upload CSV
                </h2>
                <p className="md:text-lg">
                  Load your data by selecting a CSV file type below
                </p>
              </div>
              <div className="grid gap-4 md:p-2 md:flex md:items-center md:gap-4">
                <input type="file" name="file" onChange={onChangeHandler} />
                <label className="px-2 text-md font-semibold">
                  Choose CSV type:
                </label>
                <select
                  className="p-3 rounded-lg outline-none bg-themeColor text-black"
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                >
                  <option value="">file type:</option>
                  <option value="VL">VL</option>
                  <option value="CD4">CD4</option>
                </select>
                <button
                  className="bg-blue-500 p-3 rounded-lg text-white"
                  onClick={onClickCsvUploadHandler}
                >
                  Upload CSV
                </button>
              </div>
            </div>
          </div>
        </div>
        <DisplayCSV />
      </div>
    </>
  );
};

export default CsvUpload;
