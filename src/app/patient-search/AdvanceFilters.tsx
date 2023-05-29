import React, { useState } from 'react';
import { Patient } from '../types/Patient';

type AdvanceFilterProps = {
  // eslint-disable-next-line no-unused-vars
  handleFilter: (filteredPatients: Patient[]) => void;
  patients: Patient[];
};

const AdvanceFilters: React.FC<AdvanceFilterProps> = ({ handleFilter, patients }) => {
  const [selectedGender, setSelectedGender] = useState('M');
  const [selectedAgeBracket, setSelectedAgeBracket] = useState('0-18');

  const handleAgeBracket = (): Patient[] | undefined => {
    if (selectedAgeBracket) {
      if (selectedAgeBracket === '0-18') {
        return patients.filter((item: Patient) => item.person.age <= 18);
      }

      if (selectedAgeBracket === '18-36') {
        return patients.filter((item: Patient) => item.person.age > 18 && item.person.age <= 36);
      }

      if (selectedAgeBracket === '36 +') {
        return patients.filter((item: Patient) => item.person.age > 36);
      }
    }

    return undefined;
  };

  const handleGender = () => {
    if (selectedGender) {
      const gender = patients.filter((patient: Patient) => patient?.person.gender === selectedGender);
      return gender;
    }
  };

  const handlePatientSearch = () => {
    const ageBracket = handleAgeBracket() ?? [];
    const gender = handleGender() ?? [];

    const filteredData: Patient[] = ageBracket.filter((entry) => gender.includes(entry));
    if (filteredData) {
      handleFilter(filteredData);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="ml-6 md:mb-2 mt-8">
      <div className="md:ml-32 flex md:gap-12 gap-3">
        <div className="p-1 h-8 text-sm md:h-12 md:text-md md:px-2 py-1 border border-gray-400 rounded-lg">
          <label>
            Gender:
            <select
              className="md:p-2 outline-none"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value="M">M</option>
              <option value="F">F</option>
              <option value="other">other</option>
            </select>
          </label>
        </div>

        <div className="p-1 h-8 text-sm md:h-12 md:text-md md:px-2 py-1 border border-gray-400 rounded-lg">
          <label>
            Age bracket:
            <select
              className="md:p-2 outline-none"
              value={selectedAgeBracket}
              onChange={(e) => setSelectedAgeBracket(e.target.value)}
            >
              <option value="0-18">0-18</option>
              <option value="18-36">18-36</option>
              <option value="36 +">36 +</option>
            </select>
          </label>
        </div>
        <div className="text-sm md:m-2">
          <button
            onClick={handlePatientSearch}
            className="bg-white shadow-lg hover:text-white hover:bg-blue-500 text-black font-bold py-2 px-4 rounded"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvanceFilters;
