import swal from 'sweetalert';
import { deleteObservation } from './Observation.resource';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  obsData: any;
}
const ObsModal = ({ isOpen, closeModal, obsData }: Props) => {
  const handleCloseModal = () => {
    closeModal();
  };

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

  return (
    <div>
      {isOpen && obsData.length > 0 && (
        <div
          id="defaultModal"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-[50%] mx-auto h-full"
        >
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t bg-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Obs ID: {obsData[0].obs_id}</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
                onClick={handleCloseModal}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="p-3">
                <ul className="flex items-center">
                  <li>
                    <span className="font-bold p-2">Obs Date:</span> {obsData[0].obs_datetime}
                  </li>
                  <li>
                    <span className="font-bold p-2">Obs ID:</span> {obsData[0].obs_id}
                  </li>
                  <li>
                    <span className="font-bold p-2">Location:</span> {obsData[0].name}
                  </li>
                  <li>
                    <span className="font-bold p-2">Value Coded:</span> {obsData[0].value_coded}
                  </li>
                  <li className="p-2">
                    <button
                      data-modal-hide="defaultModal"
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2 text-center w-full"
                      onClick={() => handleObsDelete(obsData[0].uuid)}
                    >
                      Void
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ObsModal;
