import Header from '../Header/Header'
import csv_image from '../../public/csv-icon.png'
import DisplayCSV from './DisplayCSV'

const CsvUpload = () => {
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
                   <input type="file"/>
                    <label >
                        <span className='px-2 text-md font-semibold'>Choose CSV type</span>
                    <select className='p-3 rounded-lg outline-none bg-themeColor text-black'>
                        <option value="VL">VL</option>
                        <option value="CD4">CD4</option>
                    </select>
                    </label>
                    <button className='bg-blue-500 p-3 rounded-lg text-white'>Upload CSV</button>
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