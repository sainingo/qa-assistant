import Header from '../Header/Header'
import csv_image from '../../public/csv-icon.png'
import { useState } from 'react'
import { CsvUploadData, uploadCsvFile } from './csv.resource'
// import DisplayCSV from './DisplayCSV'

const CsvUpload = () => {
    const [csvFile, setCsvFile] = useState(null)
    const [fileType, setFileType] = useState("")


    const onChangeHandler = (e: any) => {
        const file = e.target.files?.[0]
        if (file) {
            setCsvFile(file)
        }
    }

    const onClickCsvUploadHandler =  async (e: any) => {
        const data: CsvUploadData = {
            file: csvFile,
            username: 'Sammy',
            file_type: fileType
        }
        setFileType("");
        try {
            const res =  await uploadCsvFile(data)
            const response = await res.json()
            alert(response.response)

        } catch (error) {
            console.log(error)
        }

    }

  return (
    <>
    <Header  shouldRenderSearchLink={false} />
    <div className='bg-themeColor h-screen'>
       <div className='relative flex justify-center'>
       <div className='text-white w-[55%] mt-10 absolute flex p-4 gap-8 items-center rounded-lg shadow-lg bg-gray-500'>
            <div>
                <img src={csv_image} width={180}/>
            </div>
            <div>
                <div className=''>
                <h2 className='text-2xl'>Upload CSV</h2>
                <p className='text-lg'>Load your data by selecting a CSV file type below</p>
                </div>
                <div className='p-2 flex items-center gap-4'>
                   <input type="file" name='file' onChange={onChangeHandler}/>
                    <label className='px-2 text-md font-semibold'>Choose CSV type:</label>
                    <select className='p-3 rounded-lg outline-none bg-themeColor text-black' value={fileType} onChange={e => setFileType(e.target.value)}>
                    <option value="">Choose CSV file type</option>
                        <option value="VL">VL</option>
                        <option value="CD4">CD4</option>
                    </select>
                    <button className='bg-blue-500 p-3 rounded-lg text-white' onClick={onClickCsvUploadHandler}>Upload CSV</button>
                </div>
            </div>
        </div>
       </div>
        {/* <DisplayCSV /> */}
    </div>
    </>
  )
}

export default CsvUpload