export interface CsvUploadData {
    file: any,
    username: string,
    file_type: string
}

const url = 'http://localhost:3000/api/csv/uploads'

export const uploadCsvFile = async (data: CsvUploadData) => {
    const formData = new FormData();

    formData.append('file', data.file)
    formData.append('username', data.username)
    formData.append('file_type', data.file_type)

    const response = await fetch(url, {
        method: 'POST',
        body: formData,
    });
    return response

}