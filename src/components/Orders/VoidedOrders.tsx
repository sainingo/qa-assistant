import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import Pagination from '../patientSearch/Pagination';
import { Order } from './Orders';
import { fetchVoidedOrders, gettingPatientName, getUser } from './Order.resource';
import { useParams } from 'react-router-dom';
import { newVoidOrders } from './ActiveOrders';

function VoidedOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [privileges, setPrivileges] = useState([]); //privileges to be used when restoring orders
  const [patientName, setPatientName] = useState('');
  const [Loading, isLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [patientsPerPage] = useState<number>(5);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatients = indexOfLastPatient - patientsPerPage;
  const currentOrders = orders.slice(indexOfFirstPatients, indexOfLastPatient);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const routeParams = useParams();
  const { id } = routeParams;

  useEffect(() => {
    isLoading(true);

    const fetchingResources = async () => {
      const patient = await gettingPatientName(id);
      setPatientName(patient);

      const fetchedOrders = await fetchVoidedOrders(id);
      fetchedOrders ? setOrders(fetchedOrders) : setOrders([]);
      isLoading(false);

      const user = getUser();
      setPrivileges(user.privileges);
    };

    fetchingResources();

    if (newVoidOrders && JSON.stringify(newVoidOrders) !== JSON.stringify(orders)) {
      setOrders(newVoidOrders);
    }
  }, [setOrders, newVoidOrders]);

  return (
    <>
      {Loading ? (
        <div className="flex items-center ml-[20%] p-4 mt-4 text-2xl">
          <ClipLoader size={50} color="blue" />
        </div>
      ) : (
        <div className="w-full h-screen p-8 bg-slate-100 overflow-y-hidden overflow-x-hidden">
          {orders?.length > 0 ? (
            <>
              <div className="ml-[15%] ">
                <h2 className="text-2xl text-center">
                  Voided Orders for <span className="font-bold text-blue-500">{patientName}</span>
                </h2>
                <h2 className="p-4 ml-32 mb-2 mt-4">
                  {orders.length === 1 ? (
                    <strong>{orders.length} order found </strong>
                  ) : (
                    <strong>{orders.length} orders found </strong>
                  )}
                </h2>
                <div className="md:ml-32 relative overflow-x-auto shadow-md sm:rounded-lg md:w-[90%] md:mx-auto mt-8">
                  <table className=" lg:w-full mx-auto text-sm text-left">
                    <thead className="text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="py-5 text-center">Order Number</th>
                        <th className="text-left py-5">Order</th>
                        <th className="py-5 text-center">Date Activated</th>
                        <th className="py-5 text-center">Ordered By</th>
                        <th className="py-5 text-center">Urgency</th>
                        <th className="py-5 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrders.map((order) => (
                        <tr
                          key={order.orderUuid}
                          className="bg-white border-b hover:text-blue-500 hover:cursor-pointer"
                        >
                          <td className="px-6 py-4 text-center">{order.orderNumber}</td>
                          <td className="text-left py-5">{order.order}</td>
                          <td className="px-6 py-4 text-center">{order.date}</td>
                          <td className="px-6 py-4 text-center">{order.orderer}</td>
                          <td className="px-6 py-4 text-center">{order.urgency}</td>
                          <td className="px-6 py-4 text-center">
                            <button className="bg-cyan-900 text-white hover:bg-cyan-700 font-bold py-2 m-4 px-4 rounded-sm">
                              Restore
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination patientsPerPage={patientsPerPage} totalPatients={orders.length} paginate={paginate} />
              </div>
            </>
          ) : (
            <div className="ml-[15%] p-4">
              <p className="text-lg italic">No orders found for this patient</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default VoidedOrders;
