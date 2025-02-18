"use client";

import { useState, useEffect, useRef } from "react";
import { SEARCH_CONFIG } from "@/config/constants";
import { fetchLocationSuggestions } from "@/app/lib/api";

interface InputFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, value, onChange, placeholder }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null); // Ref to track clicks outside

  // Fetch location suggestions with debounce
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (value) {
        const results = await fetchLocationSuggestions(value);
        setSuggestions(results);
      }
    }, SEARCH_CONFIG.DEBOUNCE_DELAY);

    return () => clearTimeout(delay);
  }, [value]);

  // Detect outside clicks to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={inputRef} className="relative w-full sm:flex-1 z-50">
      <label htmlFor={id} className="sr-only">{placeholder}</label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        placeholder={placeholder}
        className="w-full p-3 border border-border rounded-lg text-textPrimary bg-surface placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      />

      {/* Location Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-surface border border-border mt-1 rounded-lg shadow-lg z-50">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-3 cursor-pointer hover:bg-primary/10"
              onClick={() => {
                onChange(suggestion);
                setShowSuggestions(false);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputField;
