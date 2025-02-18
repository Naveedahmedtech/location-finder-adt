import { Search } from "lucide-react";

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <div className="w-full sm:w-auto">
      <button
        onClick={onClick}
        className="w-full sm:w-auto bg-button text-text px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-buttonHover transition transform hover:scale-105"
      >
        <Search size={18} />
        <span>Search</span>
      </button>
    </div>
  );
};

export default SearchButton;
