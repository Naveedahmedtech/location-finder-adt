interface DropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
  }
  
  const Dropdown: React.FC<DropdownProps> = ({ value, onChange, options }) => {
    return (
      <div className="w-full sm:flex-1 z-50">
        <label htmlFor="trip-type" className="sr-only">
          Select Trip Type
        </label>
        <select
          id="trip-type"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 border border-border rounded-lg text-textPrimary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  };
  
  export default Dropdown;
  