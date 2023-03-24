import { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { AiOutlineDelete } from 'react-icons/ai'
import storage from '../../app/localStorage'
const SearchPatientIdentifier = () => {
const [patientIdentifier,setPatientIdentifier] = useState({identifier:''})
const {identifier} = patientIdentifier;
const onChange = (e: { target: { name: any; value: any } }) => {
setPatientIdentifier({ ...patientIdentifier, [e.target.name]: e.target.value });
};
const [identifierList, setIdentifierList] = useState<string[]>([]);

const tabulateIdentifier = () => {
const identifierInput = document.getElementById(
  "identifier"
) as HTMLInputElement;
if (identifierInput.value.length>0) {
  //remove duplicates
  const formatIdentifiers = new Set(identifier.split(","));
  const newIdentifiers = Array.from(formatIdentifiers).filter(
    (id) => !identifierList.includes(id)
  );
  setIdentifierList([...identifierList, ...newIdentifiers]);
  if (identifierInput) {
    identifierInput.value = "";
  }
} 
else {
  return;
}
};
const currentDate = new Date();
//month options
const monthOptions = [];
for (let i = 0; i < 12; i++) {
  const month = new Date(currentDate.getFullYear(), i).toLocaleString('default', { month: 'long' });
  monthOptions.push(<option key={i} value={i+1}>{month}</option>);
}
// year options
const yearOptions = [];
const baseYear = 2020;
const currentYear = currentDate.getFullYear();
for (let i = baseYear; i <= currentYear; i++) {
  yearOptions.push(<option key={i} value={i}>{i}</option>);
}
const deleteIdentifier = (id:any) =>{
  setIdentifierList(identifierList.filter(existing => existing !== id));
}

const handleSubmit = ()=>{
  const selectedMonth = (document.querySelector('.month-dropdown') as HTMLSelectElement).value;
  const selectedYear = (document.querySelector('.year-dropdown')as HTMLSelectElement).value;
  const lastDayOfMonth = new Date(parseInt(selectedYear), parseInt(selectedMonth), 0).getDate();
  //covert date to yyyy/mm/dd
  const reporting_month = new Date(`${selectedYear}-${selectedMonth}-${lastDayOfMonth}`).toISOString().split('T')[0]
  const {user} = storage.loadData()
  const user_id = user.uuid
  const requestBody = JSON.stringify({identifierList,reporting_month,user_id})
  console.log(requestBody)
}
  return (
<div>
<Header shouldRenderSearchLink={false}/>
<div className='flex justify-center'>
  <div className='bg-gray-200 inline-block w-auto mt-10'>
    <select className='mt-3 mb-3 ml-3 mr-3 month-dropdown'>
      {monthOptions}
     </select>
    <select className='mt-3 mb-3 ml-3 mr-3 year-dropdown'>
  {yearOptions}
  </select>
  </div>
     <div className='bg-gray-200 inline-block ml-5 w-auto mt-10 '>
      <input id='identifier' name = "identifier" onChange={onChange} className='mt-1 mb-1 ml-1 mr-1 h-10 mr-1'
      placeholder='Add Identifier'/>
         </div>
         <div className='mt-10 ml-3 flex'>
          <button onClick={tabulateIdentifier} className='text-red-600 border hover:bg-red-500 hover:text-white hover:font-bold border-gray-300 py-2 px-5'>Add</button>
          </div> 
          <div className='inline-block  ml-3 mt-10'>
       </div>
    </div>
    {identifierList.length>0&&
        <div>
        <div className='flex justify-center mt-5'>
            <table className="w-[50%] text-sm text-left">
               <thead className="text-white uppercase bg-gray-200 w-full">
                <tr>
                   <th className="px-4 py-2 text-black">Count</th>
                 <th className="px-4 py-2 text-black">Identifier</th>
                  <th></th>
                    </tr>
                    </thead>
                     <tbody>
                   {identifierList.map((id, index) => (
                    <tr key={index} className="bg-gray-100 hover:bg-gray-300 ">
                <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{id}</td>
            <td className="px-4 py-2">
      <button className="text-red-600 hover:text-red-800" onClick={() => deleteIdentifier(id)}>
      <AiOutlineDelete size={18} />
        </button>
          </td>
            </tr>
                  ))}
                </tbody>
              </table>
              <div>
            <button onClick={handleSubmit} className='bg-blue-600 text-white font-bold py-2 px-5 ml-5' >Submit</button>
               </div>
          </div>
          </div>
          }
    </div>
  )
}

export default SearchPatientIdentifier
