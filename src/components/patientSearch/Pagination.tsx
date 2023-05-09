import React from 'react';

interface Props {
  patientsPerPage: number;
  totalPatients: number;
  paginate: (number: number) => any;
}

const Pagination: React.FC<Props> = ({ patientsPerPage, totalPatients, paginate }) => {
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPatients / patientsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className=" mt-6">
      <ul className="flex ml-20">
        {pageNumbers.map((number, index) => (
          <li
            key={index}
            onClick={() => paginate(number)}
            className="px-4 mx-6 rounded-sm py-2 border text-blue-800 hover:bg-blue-900 hover:text-white border-gray-700 hover:cursor-pointer"
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
