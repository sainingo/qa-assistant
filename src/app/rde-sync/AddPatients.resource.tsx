import { RequestBody } from './Model';

export const queuePatients = async (requestBody: RequestBody) => {
  const request = JSON.stringify(requestBody);
  const response = await fetch('/api/rde-sync/queue', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: request,
  });
  return response;
};

export function getLastDayOfMonth(month: string) {
  const year = Number(month.substring(0, 4));
  const monthNumber = Number(month.substring(5, 7));

  // Calculate the number of days in the month
  const daysInMonth = new Date(year, monthNumber, 0).getDate();

  return `${year}-${month.substring(5)}-${daysInMonth}`;
}
