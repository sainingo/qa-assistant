import React from 'react'

const DisplayCSV = () => {
  return (
    <div className="w-[60%] mx-auto mt-[18%]">
        <div>
        <div className="overflow-x-auto shadow-md">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-blue-300">
                <tr>
                  <th scope="col" className="px-6 py-3">
                   Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Collection Date
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
                  <tr
                    className="bg-white border-b hover:cursor-pointer"
                  >

                    <td className="px-6 py-4">John doe</td>
                    <td className="px-6 py-4">01/01/2023</td>
                    <td className="px-6 py-4"><span className='bg-lime-500 p-2'>VL</span></td>
                    <td className="px-6 py-4">SYNCED</td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

export default DisplayCSV