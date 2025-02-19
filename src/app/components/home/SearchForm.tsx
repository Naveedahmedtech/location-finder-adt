"use client";

import { useState } from "react";
import Dropdown from "@/app/components/ui/Dropdown";
import InputField from "@/app/components/ui/InputField";
import SearchButton from "@/app/components/ui/SearchButton";
import StopInputField from "@/app/components/ui/StopInputField";
import { Plus } from "lucide-react";

interface SearchFormProps {
  tripType: string;
  setTripType: (value: string) => void;
  from: string;
  setFrom: (value: string) => void;
  to: string;
  setTo: (value: string) => void;
  stops: string[];
  setStops: (stops: string[]) => void;
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
  stops,
  setStops,
  tripOptions,
  onSearch,
}) => {
  const [newStop, setNewStop] = useState("");

  const addStop = () => {
    if (newStop.trim() && stops.length < 5) {
      setStops([...stops, newStop]);
      setNewStop("");
    }
  };

  const removeStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto bg-background p-4 md:p-6 rounded-lg shadow-lg border border-border">
      {/* Search Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Dropdown value={tripType} onChange={setTripType} options={tripOptions} />
        <InputField id="from-location" value={from} onChange={setFrom} placeholder="From (city, airport)" />
        <InputField id="to-location" value={to} onChange={setTo} placeholder="To (city, airport)" />
        <SearchButton onClick={onSearch} />
      </div>

      {/* Stops Section */}
      {stops.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {stops.map((stop, index) => (
            <StopInputField
              key={index}
              id={`stop-${index}`}
              value={stop}
              onChange={(newValue) => {
                const updatedStops = [...stops];
                updatedStops[index] = newValue;
                setStops(updatedStops);
              }}
              onRemove={() => removeStop(index)}
            />
          ))}
        </div>
      )}

      {/* Add Stop Input */}
      {stops.length < 5 && (
        <div className="mt-3 flex gap-2">
          <StopInputField id="new-stop" value={newStop} onChange={setNewStop} placeholder="Add a stop (optional)" />
          <button
            onClick={addStop}
            className="bg-button text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-buttonHover transition"
          >
            <Plus size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
