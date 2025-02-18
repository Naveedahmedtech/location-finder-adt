"use client";

import Dropdown from "@/app/components/ui/Dropdown";
import InputField from "@/app/components/ui/InputField";
import SearchButton from "@/app/components/ui/SearchButton";

interface SearchFormProps {
    tripType: string;
    setTripType: (value: string) => void;
    from: string;
    setFrom: (value: string) => void;
    to: string;
    setTo: (value: string) => void;
    tripOptions: string[];
    onSearch: () => void;
  }
  
  const SearchForm: React.FC<SearchFormProps> = ({
    tripType,
    setTripType,
    from,
    setFrom,
    to,
    setTo,
    tripOptions,
    onSearch,
  }) => {
    return (
      <div className="max-w-4xl mx-auto mt-10 bg-background p-6 md:p-8 rounded-lg shadow-lg flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
        <Dropdown value={tripType} onChange={setTripType} options={tripOptions} />
        <InputField id="from-location" value={from} onChange={setFrom} placeholder="From (countries, cities and airports)" />
        <InputField id="to-location" value={to} onChange={setTo} placeholder="To (countries, cities and airports)" />
        <SearchButton onClick={onSearch} />
      </div>
    );
  };
  
  export default SearchForm;
