export const getPatientObservations = async (uuid: string): Promise<any> => {
  try {
    const response = await fetch(`/ws/rest/v1/obs?patient=${uuid}&v=default`, {
      headers: {
        Accept: 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('err', error);
  }
};

export const deleteObservation = async (uuid: string) => {
  const url = `/ws/rest/v1/obs/${uuid}?purge=true`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.log('err', error);
  }
};
