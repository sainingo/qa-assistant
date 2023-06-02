export const getPatientObservations = async (uuid: string, startIndex: number, pageSize: number): Promise<any> => {
  try {
    const response = await fetch(
      `/ws/rest/v1/obs?patient=${uuid}&v=default&startIndex=${startIndex}&limit=${pageSize}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
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

export const getPatientObservationByID = async (id: any) => {
  try {
    const response = await fetch(`http://0.0.0.0:5080/api/obs/${id}`,
    {
      headers: {
        Accept: 'application/json',
      },
    },);
    const result = await response.json();
    return result;

  } catch (error) {
    console.log(error)
  }
}
