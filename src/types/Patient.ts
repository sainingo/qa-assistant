export type Patient = {
  date_created: string;
  person_id: number;
  patient_name: string;
  person_uuid: string;
  birthdate: string;
  age: number;
  gender: string;
  location_id: number;
  clinic: string;
  rtc_date: string;
  prev_status: string;
  live_status: string;
  frozen_status: string;
  next_status: string | null;
  reporting_month: string;
  queue_status: string;
};
