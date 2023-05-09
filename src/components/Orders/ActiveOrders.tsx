import { useEffect, useState } from 'react';
import Pagination from '../patientSearch/Pagination';
import { getUser, fetchActiveOrders, fetchVoidedOrders, gettingPatientName } from './Order.resource';
import { ClipLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Order } from './Orders';

let newVoidOrders: Order[];

function ActiveOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [privileges, setPrivileges] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [patientsPerPage] = useState<number>(5);
  const [Loading, isLoading] = useState(false);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatients = indexOfLastPatient - patientsPerPage;
  const currentOrders = orders?.slice(indexOfFirstPatients, indexOfLastPatient);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const routeParams = useParams();
  const { id } = routeParams;

  useEffect(() => {
    isLoading(true);

    const fetchingResources = async () => {
      const patient = await gettingPatientName(id);
      setPatientName(patient);

      const fetchedOrders = await fetchActiveOrders(id);
      fetchedOrders ? setOrders(fetchedOrders) : setOrders([]);
      isLoading(false);

      const user = getUser();
      setPrivileges(user.privileges);
    };

    fetchingResources();
  }, [setOrders]);

  const handleVoidOrder = async (orderUuid: string, privileges: any, userUuid: any) => {
    const canDeleteOrders = privileges.find((privilege: { name: string }) => privilege.name === 'Delete Orders');

    if (canDeleteOrders) {
      swal('Are you sure you want to void this order?', {
        buttons: ['No', 'Yes'],
      }).then(async (willDelete) => {
        if (willDelete) {
          const response = await fetch(`/ws/rest/v1/order/${orderUuid}?!purge`, {
            method: 'DELETE',
          }).then(async (response) => {
            console.log('response when voiding', response);

            if (response.ok) {
              swal('Order has been voided', {
                icon: 'success',
              });

              const currentOrders = orders.filter((order) => order.orderUuid !== orderUuid);
              setOrders(currentOrders);

              newVoidOrders = await fetchVoidedOrders(userUuid);
            } else if (response.status === 504) {
              swal('Request is taking too long, try refreshing the page', {
                icon: 'error',
              });
            } else {
              swal('Unable to void order', {
                icon: 'error',
              });
            }
          });
        } else {
          swal('Order has not been voided', {
            icon: 'info',
          });
        }
      });
    } else {
      swal({
        title: 'User lacks privilege',
        text: 'Unathourized',
        icon: 'error',
      });
    }
  };

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
                  Active Orders for <span className="font-bold text-blue-500">{patientName}</span>
                </h2>
                <h2 className="p-4 ml-32 mb-2 mt-4">
                  {orders.length === 1 ? (
                    <strong>{orders.length} order found </strong>
                  ) : (
                    <strong>{orders.length} orders found </strong>
                  )}
                </h2>
                <div className="md:ml-32 relative overflow-x-auto shadow-md sm:rounded-lg md:w-[90%] md:mx-auto mt-8">
                  <table className=" lg:w-full mx-auto text-sm text-left" data-testid="orders-table">
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
                        <tr key={order.orderUuid} className="bg-white border-b hover:text-blue-500">
                          <td className="px-6 py-4 text-center">{order.orderNumber}</td>
                          <td className="text-left py-5">{order.order}</td>
                          <td className="px-6 py-4 text-center">{order.date}</td>
                          <td className="px-6 py-4 text-center">{order.orderer}</td>
                          <td className="px-6 py-4 text-center">{order.urgency}</td>
                          <td className="px-6 py-4 text-center">
                            <button
                              className="bg-cyan-900 text-white hover:bg-cyan-700 font-bold py-2 m-4 px-4 rounded-sm"
                              onClick={() => handleVoidOrder(order.orderUuid, privileges, id)}
                            >
                              Void
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

export { newVoidOrders };

export default ActiveOrders;
