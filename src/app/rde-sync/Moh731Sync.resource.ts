import storage from '../localStorage';
import { Patient } from '../../types/Patient';
import { ProcessQueuePayload } from '../../types/Payloads';

export const fetchMoh731SyncQueue = async (month: string): Promise<Patient[]> => {
  const { user } = storage.loadData();
  const userId = user.uuid;

  const reportingMonth = getReportingMonth(month);

  const response = await fetch(`/api/rde-sync/queue-patientlist?user_id=${userId}&reporting_month=${reportingMonth}`);
  const data = await response.json();
  return data;
};

function getReportingMonth(yearMonth: string) {
  const [year, month] = yearMonth.split('-');
  const date = new Date(parseInt(year), parseInt(month), 0); // 0 sets date to last day of previous month
  const lastDayOfMonth = date.getDate();
  const isoString = `${year}-${month.toString().padStart(2, '0')}-${lastDayOfMonth.toString().padStart(2, '0')}`;
  return isoString;
}

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
