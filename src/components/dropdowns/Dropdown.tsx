import React, { useState } from 'react';

export interface selectedOption {
  selectedOption: Option;
}

interface DropdownOptions {
  options: Option[];
  firstOptionText: string;
}

type Option = {
  label: string;
  value: string;
};

const Dropdown: React.FC<DropdownOptions> = ({ options, firstOptionText }) => {
  const [selectedOption, setSelectedOption] = useState<Option>();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option = options.find((o) => o.value === event.target.value);

    if (option) {
      setSelectedOption(option);
    }
  };

  return (
    <div>
      <select
        id="dropdown"
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option value="">{firstOptionText}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
