import storage from '../localStorage';
import { Patient } from '../../types/Patient';
import { ProcessQueuePayload } from '../../types/Payloads';

export const fetchMoh731SyncQueue = async (date: Date): Promise<Patient[]> => {
  const { user } = storage.loadData();
  const userId = user.uuid;

  const reportingMonth = formatDateToLastDayOfMonth(date);
  // console.log('reportin month', reportingMonth);

  const response = await fetch(`/api/rde-sync/queue-patientlist?user_id=${userId}&reporting_month=${reportingMonth}`);
  const data = await response.json();
  return data;
};

export const formatDateToLastDayOfMonth = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Adding 1 since months are zero-based (January is 0)
  const lastDay = new Date(year, month, 0).getDate(); // Get the last day of the month

  const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
  return formattedDate;
};

export const processQueuedPatients = async (payload: ProcessQueuePayload) => {
  return fetch('/api/rde-sync/process-queue-patients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export const freezeProcessedPatients = async (payload: ProcessQueuePayload) => {
  return fetch('/api/rde-sync/freeze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.status;
    })
    .catch((error) => {
      console.error('Error: ', error);
    });
};
