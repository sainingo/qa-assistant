import storage from "../../app/localStorage";
import { Patient } from "../../types/Patient";
import { ProcessQueuePayload } from "../../types/Payloads";
import { reportingMonth } from "./AddPatients.component";

export const fetchMoh731SyncQueue = async (): Promise<Patient[]> => {
  const { user } = storage.loadData();
  const userId = user.uuid;

  const response = await fetch(
    `/api/rde-sync/queue-patientlist?user_id=${userId}&reporting_month=${reportingMonth}`
  );
  const data = await response.json();
  return data;
};

export const processQueuedPatients = async (payload: ProcessQueuePayload) => {
  return fetch("/api/rde-sync/process-queue-patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
