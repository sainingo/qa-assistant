import React, { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: Option[];
  selectedOption?: Option;
  onChange: (option: Option) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, selectedOption, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption?.label ?? 'Select an option'}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li key={option.value}>
              <button onClick={() => handleOptionClick(option)}>{option.label}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
