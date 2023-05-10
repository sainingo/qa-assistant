
  export const queryObservation = async (query: string) => {
    const url = `/openmrs/ws/rest/v1/obs?patient=${query}&v=default`
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        })
        return response;
    } catch (error) {
        console.log('err',error)

    }
};

export const deleteObservation = async (uuid: string) => {
    const url = `/openmrs/ws/rest/v1/obs/${uuid}?purge=true`
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        })
        return response;
    } catch (error) {
        console.log('err',error)

    }
}
