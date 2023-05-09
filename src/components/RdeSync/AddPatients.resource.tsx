export const queuePatients = async (requestBody: any) => {
  const response = await fetch('/api/rde-sync/queue', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: requestBody,
  });
  return response;
};

function getLastDayOfMonth(monthIndex: number, year: any) {
  const lastDay = new Date(year, monthIndex + 1, 0);
  return lastDay.getDate();
}

export const setReportingMonth = async () => {
  const selectedMonth = (document.querySelector('.month-dropdown') as HTMLSelectElement).value;
  const selectedYear = (document.querySelector('.year-dropdown') as HTMLSelectElement).value;
  const lastDayOfMonth = getLastDayOfMonth(parseInt(selectedMonth) - 1, selectedYear);
  // //convert date to yyyy/mm/dd
  const reportingMonth = new Date(Date.UTC(parseInt(selectedYear), parseInt(selectedMonth) - 1, lastDayOfMonth))
    .toISOString()
    .split('T')[0];

  return reportingMonth;
};
