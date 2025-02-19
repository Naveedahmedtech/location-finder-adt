"use client";

import { useState, useEffect, useRef } from "react";
import { SEARCH_CONFIG } from "@/config/constants";
import { fetchLocationSuggestions } from "@/app/lib/api";
import { X } from "lucide-react";

interface StopInputFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onRemove?: () => void; // Optional remove function for existing stops
  placeholder?: string;
}

const StopInputField: React.FC<StopInputFieldProps> = ({ id, value, onChange, onRemove, placeholder = "Add a stop (optional)" }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  // Fetch suggestions with debounce
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (value.trim().length > 2) {
        const results = await fetchLocationSuggestions(value);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    }, SEARCH_CONFIG.DEBOUNCE_DELAY);

    return () => clearTimeout(delay);
  }, [value]);

  // Close suggestions when clicking outside
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
    <div ref={inputRef} className="relative w-full sm:flex-1">
      <label htmlFor={id} className="sr-only">{placeholder}</label>
      <div className="flex items-center gap-2 p-2 bg-surface border border-border rounded-lg">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          placeholder={placeholder}
          className="w-full p-3 bg-transparent text-textPrimary placeholder-textSecondary focus:outline-none"
        />
        {onRemove && (
          <button onClick={onRemove} className="text-error p-1 hover:bg-error/20 rounded-full">
            <X size={18} />
          </button>
        )}
      </div>

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

export default StopInputField;
