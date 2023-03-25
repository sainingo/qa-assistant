import React from 'react';

const AddPatientComponent = () => {

    return (
        <div className='container m-auto grid grid-cols-2 gap-4'>
            <div>
                <h1>COL 1</h1>
            </div>
            <div className='col-span-2'>
                <h1>COL 2</h1>
            </div>
        </div>
    );
}

export default AddPatientComponent;