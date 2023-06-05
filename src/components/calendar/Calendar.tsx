import React from 'react';

interface CalendarProps {
  selectedMonth: Date;
  // eslint-disable-next-line no-unused-vars
  handleMonthChange: (value: Date) => void;
}

const CalendarComponent: React.FC<CalendarProps> = ({ selectedMonth, handleMonthChange }: CalendarProps) => {
  const selectedValue = selectedMonth
    ? `${selectedMonth.getFullYear()}-${(selectedMonth.getMonth() + 1).toString().padStart(2, '0')}-${selectedMonth
        .getDate()
        .toString()
        .padStart(2, '0')}`
    : '';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    handleMonthChange(selectedDate);
  };

  return (
    <div className="flex items-center mt-2 mb-3 space-x-4">
      <label htmlFor="start" className="mb-2 font-bold text-gray-700">
        Reporting month:
      </label>
      <input
        type="date"
        id="start"
        name="start"
        className="px-3 py-2 border border-gray-400 rounded-lg"
        min="2019-01-01"
        max="2023-04-30"
        value={selectedValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default CalendarComponent;
