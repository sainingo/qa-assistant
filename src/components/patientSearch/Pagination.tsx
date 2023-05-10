import React, { useState } from 'react';

interface Props {
  patientsPerPage: number;
  totalPatients: number;
  paginate: (number: number) => any;
}

const Pagination: React.FC<Props> = ({ patientsPerPage, totalPatients, paginate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  const pageNumbers: any = [];
  for (let i = 1; i <= Math.ceil(totalPatients / patientsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    if (pageNumbers.length <= 5) {
      return pageNumbers.map((number: any, index: any) => (
        <li key={index}>
          <button
            key={index}
            className={`px-4 mx-2 rounded-sm py-2 border text-blue-800 ${
              currentPage === number ? 'bg-blue-900 text-white' : 'border-gray-700 hover:bg-blue-900 hover:text-white'
            }`}
            onClick={() => {
              paginate(number);
              setCurrentPage(number);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                paginate(number);
                setCurrentPage(number);
              }
            }}
          >
            {number}
          </button>
        </li>
      ));
    } else {
      const firstPageNumbers = pageNumbers.slice(0, 3);
      const lastPageNumbers = pageNumbers.slice(-1);
      return (
        <>
          {firstPageNumbers.map((number: any, index: any) => (
            <li key={index}>
              <button
                key={index}
                className={`px-4 mx-2 rounded-sm py-2 border text-blue-800 ${
                  currentPage === number
                    ? 'bg-blue-900 text-white'
                    : 'border-gray-700 hover:bg-blue-900 hover:text-white'
                }`}
                onClick={() => {
                  paginate(number);
                  setCurrentPage(number);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    paginate(number);
                    setCurrentPage(number);
                  }
                }}
              >
                {number}
              </button>
            </li>
          ))}
          <li className="px-4 mx-2 rounded-sm py-2 border text-blue-800 border-gray-700">...</li>
          <li>
            <button
              className={`px-4 mx-2 rounded-sm py-2 border text-blue-800 ${
                currentPage === lastPageNumbers[0]
                  ? 'bg-blue-900 text-white'
                  : 'border-gray-700 hover:bg-blue-900 hover:text-white'
              }`}
              onClick={() => {
                paginate(lastPageNumbers[0]);
                setCurrentPage(lastPageNumbers[0]);
              }}
            >
              {lastPageNumbers[0]}
            </button>
          </li>
        </>
      );
    }
  };

  const handleNextClick = () => {
    paginate(currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="mt-6">
      <ul className="flex justify-center gap-6">
        {renderPageNumbers()}
        {currentPage < pageNumbers.length && (
          <li>
            <button
              className="px-4 mx-2 rounded-sm py-2 border text-blue-800 border-gray-700 hover:bg-blue-900 hover:text-white cursor-pointer"
              onClick={handleNextClick}
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
