import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { useNavigate } from 'react-router-dom'
const DisplayRdeSync = () => {
    const navigate = useNavigate();
const [patientReport, setPatientReport] = useState(false)
  return (
<div>
<Header shouldRenderSearchLink={false}/>
<div className='flex'>
<div className='inline-block  ml-5 mt-10'>
<button onClick={()=>{navigate("/rde-identifier")}} className='bg-blue-500 text-white font-bold py-3 px-3 rounded'>Add Patient</button>
</div>
<div className="ml-5 relative overflow-x-auto shadow-md sm:rounded-lg md:w-[75%] mt-8">
    <table className=" lg:w-full mx-auto text-sm text-left text-black ">
    <thead className="text-xs uppercase text-black bg-gray-100">
    <tr>
    <th scope="col" className="px-6 py-3">
    Identifier
    </th>
    <th scope="col" className="px-6 py-3">
    Patient Name
    </th>
    <th scope="col" className="px-6 py-3">
    Location 
    </th>
    <th scope="col" className="px-6 py-3">
    Reporting Month
    </th>
    <th scope="col" className="px-6 py-3">
    Status
    </th>
    <th scope="col" className="px-6 py-3">
    Last Updated
    </th>
    </tr>
    </thead>
    <tbody>
    </tbody>
    </table>
    <div>
      {patientReport ? <div>
        Display Data
      </div>:<div className='ml-5'>No Patient Selected </div>}
    </div>
    </div>
</div>
</div>
  )
}

export default DisplayRdeSync
