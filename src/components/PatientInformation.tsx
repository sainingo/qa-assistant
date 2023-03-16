import { useContext } from 'react';
import { AppContext } from '../context/AppContext'
import Header from './Header/Header';
import SideNavBar from './SideNavBar/SideNavBar';


const PatientInformation = () => {
    const { currentPatient } = useContext(AppContext)

    return (
        <>
       <Header />
       <SideNavBar />
        <div className='bg-lightGray h-screen'>
        {currentPatient.length <= 1 ? currentPatient.map((info: any = {}, index) => (
            <>
            <div className='sm:w-[85%] mx-auto sm:flex pt-8 lg:ml-[20%] ' key={index}>
                <div className='bg-hashBlue p-4 rounded sm:w-md '>
                    <div className='bg-lightGray rounded-full mx-auto w-36 h-36 flex justify-center items-center'>
                        <h1 className='text-9xl font-bold '>{info[0].person.preferredName.display[0]}</h1>
                    </div>
                    <div>
                        <h3 className='font-bold text-white text-center'>{info[0].person.preferredName.display}</h3>
                    </div>
                </div>
            <div className='grid grid-cols-1 gap-8 md:text-sm 2xl:text-lg md:grid-cols-4
                  p-8 bg-white rounded md:w-[75%] justify-between'>

                                          <div key={index}>
                                             <b>Address</b>
                                             <p>{info[0].person.preferredAddress.display}</p>
                                         </div>
                                         <div>
                                             <b>Gender</b>
                                             <p>{info[0]?.person.gender}</p>
                                         </div>
                                         <div>
                                             <b>Age</b>
                                             <p>{info[0]?.person.age}</p>
                                         </div>
                                         <div>
                                             <b>Date of Birth</b>
                                             <p>{new Date(info[0]?.person.birthdate).toLocaleString().split(" ")[0].slice(0,-1)}</p>
                                         </div>
                </div>
            </div>
            </>
        )) : (<p className='absolute ml-[15%]'>Go to search patient..</p>)}
        </div>
        </>
    )

}

export default PatientInformation;