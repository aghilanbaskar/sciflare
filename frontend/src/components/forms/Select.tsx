interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  label: string;
  onSelect: (value: string) => void;
  selectedValue: string;
}

const Select = ({ options, label, onSelect, selectedValue }: SelectProps) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  return (
    <div>
      <label
        htmlFor="options"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id="options"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleSelect}
        value={selectedValue}
      >
        <option disabled>Choose an option</option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
