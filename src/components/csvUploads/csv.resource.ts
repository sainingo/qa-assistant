export interface CsvUploadData {
  file: File;
  username: string;
  file_type: string;
  total_records: number;
}

export interface UpdatedData {
  status: string;
  successful: number;
  eid_file_upload_metadata_id: number;
}

export const uploadCsvFile = async (data: CsvUploadData) => {
  const formData = new FormData();

  formData.append('file', data.file);
  formData.append('username', data.username);
  formData.append('file_type', data.file_type);
  formData.append('total_records', data.total_records.toString());

  const response = await fetch('/csv/uploads', {
    method: 'POST',
    body: formData,
  });
  return response;
};

export const getCsvFiles = async (logged_user: string) => {
  try {
    const response = await fetch(`/csv/uploads?logged_user=${logged_user}`);
    if (response.ok) {
      return response;
    }
  } catch (error) {
    console.log(error, 'error');
  }
};

// void 1 on delete
export const deleteCsvFile = async (id: number) => {
  // put id from the body
  const response = await fetch('/csv/uploads', {
    method: 'PUT',
    body: JSON.stringify(id),
  });
  return response;
};

// sync data
export const syncCsvFile = async (path: string) => {
  const response = await fetch('/push/csvs', {
    method: 'POST',
    body: path,
  });
  return response;
};

// fetch error logs
export const getErrorLogs = async (fileName: string) => {
  const response = await fetch(`/csv/logs?file_name=${fileName}`);
  if (response.ok) {
    return response;
  }
};
