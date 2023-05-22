import { Patient } from '../../types/Patient';

export async function fetchPatientData(uuid: string): Promise<Patient> {
  try {
    const response = await fetch(`/ws/rest/v1/patient/${uuid}?v=full`);
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching patient data:', error);
    throw error;
  }
}
