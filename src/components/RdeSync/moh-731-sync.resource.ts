import { Patient } from "../../types/Patient";

export const fetchMoh731SyncQueue = async (): Promise<Patient[]> => {
  const response = await fetch(`/api/rde-sync/queue-patientlist?user_id=45&reporting_month=2022-12-31`);
  const data = await response.json();
  return data;
};
