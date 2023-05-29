import { useEffect, useState } from 'react';
import { deleteObservation, getPatientObservations } from './Observation.resource';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Header from '../../../components/layout/headers/Header';
import Sidebar from '../../../components/layout/Sidebar';
import Pagination from '../../../components/pagination/Pagination';
import SimpleFooter from '../../../components/layout/SimpleFooter';
import PatientBanner from '../banners/PatientBanner';

const ObservationComponent = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [obs, setObs] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataPerPage] = useState<number>(3);
  const [loading, setLoading] = useState(false)
  const [pageSize, setPageSize] = useState<number>(10);

  const indexOfLastPatient = currentPage * dataPerPage;
  const indexOfFirstPatients = indexOfLastPatient - dataPerPage;
  const currentData = obs?.slice(indexOfFirstPatients, indexOfLastPatient);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize + dataPerPage);
  };

  useEffect(() => {
    if (uuid) {
      getPatientObservations(uuid, (currentPage - 1) * dataPerPage, pageSize)
        .then(({ results }) => {
          setObs(results);
          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
          swal('Error', 'An error occurred while fetching observations', error);
        });
    }
  }, [uuid, currentPage, dataPerPage, pageSize]);


  const userInfo = obs[0]?.person?.display;

  let user_name = '';
  if (userInfo) {
    const parts = userInfo?.split('-');
    user_name = parts[2]
  }

  const handleObsDelete = async (id: string) => {
    swal({
      title: 'Are you sure?',
      text: 'Once Deleted, you will not be able to recover this item!',
      icon: 'warning',
      buttons: ['No', 'Yes'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await deleteObservation(id);
        if (res?.status === 204) {
          swal('Poof! Your Observation has been deleted!', {
            icon: 'success',
          });
          window.location.reload();
        }
      }
    });
  };

  if(!loading) {
    return (
      <p className='ml-[4%] text-xl font-bold'>Loading....</p>
    )
  }

  return (
    <>
      <PatientBanner />
      <div className="mt-[2%]  sm:w-[60%] md:w-[90%]">
        <h1 className="text-xl md:text-2xl text-center font-bold underline">Obs for {user_name}</h1>
        <div className="p-4 mt-6 w-[80%] mx-auto">
          <span className="text-lg font-bold">Total Obs: {obs.length}</span>
          {currentData.map((ob: any, index: number) => {
            const parts = ob.display.split(':');
            const question = parts[0].trim();
            const answers = parts[1].split(',').map((answer: any) => answer.trim());
            return (
              <div key={index} className="p-2 rounded border-gray-300 border-b-2 mb-2 mt-2">
                <ul className="flex justify-around text-sm">
                  <li>
                    Date: <span className="italic font-semibold">{new Date(ob.obsDatetime).toLocaleDateString()}</span>
                  </li>
                  <li>
                    Location: <span className="text-blue-500">{ob.location.display}</span>
                  </li>
                  <li>Status: {ob.status}</li>
                  <li>
                    <button
                      onClick={() => handleObsDelete(ob.uuid)}
                      className="bg-blue-500 text-white py-1 px-2 rounded-sm"
                    >
                      Void
                    </button>
                  </li>
                </ul>
                <div className="m-2 pl-4 md:w-[80%] mx-auto pt-1">
                  <h3 className="p-2 sm:text-xl">
                    <span className="font-bold pr-1">QUESTION:</span> {question} ?
                  </h3>
                  <div className="md:px-20 text-sm ">
                    <span className="text-green-500 font-bold pr-2">ANS: </span>
                    <ul className="max-h-16 overflow-y-auto">
                      {' '}
                      {answers.map((answer: string, index: number) => (
                        <li key={index} className="pl-8 italic">
                          - {answer}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-4">{index + 1} .</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mx-auto">
          {dataPerPage && <Pagination patientsPerPage={dataPerPage} totalPatients={obs.length} paginate={paginate} />}
        </div>
      </div>
    </>
  );
};

const Observation = () => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="p-4 overflow-y-auto">
            <ObservationComponent />
          </main>
          <SimpleFooter />
        </div>
      </div>
    </>
  );
};

export default Observation;
