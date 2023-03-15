export const searchPatient = async (query: string) => {
  return fetch(`openmrs/ws/rest/v1/patient?q=${query}&v=default&limit=full`, {
    method: "GET",
    redirect: "follow",
  })
    .then((Response) => Promise.all([Response.headers, Response.json()]))
    .then(([_, { results }]) => {
      return results;
    });
};
