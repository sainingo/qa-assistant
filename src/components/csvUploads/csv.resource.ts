export interface CsvUploadData {
    file: any,
    username: string,
    file_type: string,
    total_records: number,
}

export interface UpdatedData {
    status: string,
    successful: number,
    eid_file_upload_metadata_id: number,
}


const url = 'http://localhost:3000/api'


export const uploadCsvFile = async (data: CsvUploadData) => {
    const formData = new FormData();

    formData.append('file', data.file)
    formData.append('username', data.username)
    formData.append('file_type', data.file_type)
    formData.append('total_records', data.total_records.toString())

    const response = await fetch(url+'/csv/uploads', {
        method: 'POST',
        body: formData,
    });
    return response
}

export const getCsvFiles = async (logged_user: string) => {
  // const requestOptions: RequestInit = {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     logged_data: logged_user
  //   })
  // };

  try {
    const response = await fetch(url+ `/csv/uploads?logged_user=${logged_user}`);
    if(response.ok) {
       return response
    }
  } catch (error) {
    console.log(error , 'error')
  }
}

  // void 1 on delete
  export const deleteCsvFile = async (id: number) => {
   // put id from the body
    const response = await fetch(url+ '/csv/uploads', {
      method: 'PUT',
      body: JSON.stringify(id),
    }
    );
    return response
  }

  // sync data
  export const syncCsvFile = async (path: string) => {
    const response = await fetch(url+ '/push/csvs', {
      method: 'POST',
      body: path,
    }
    );
    return response
  }

  // updated status
  // export const updateCsvFileStatus = async (params: UpdatedData) => {
  //   // const data = {
  //   //   status: params.status,
  //   //   successful: params.successful,
  //   //   eid_file_upload_metadata_id: params.eid_file_upload_metadata_id
  //   // }

  //   const response = await fetch(url+ '/csv/update_status', {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     // body: JSON.stringify(data),
  //   }
  //   );
  //   return response
  // }
