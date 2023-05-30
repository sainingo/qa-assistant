export const searchPatient = async (query: string) => {
  return fetch(`/ws/rest/v1/patient?q=${query}&v=default`)
    .then((Response) => Promise.all([Response.headers, Response.json()]))
    .then(([, { results }]) => {
      return results;
    });
};
