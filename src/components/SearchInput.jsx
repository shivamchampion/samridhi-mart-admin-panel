// src/components/SearchInput.jsx
import { Search } from 'lucide-react';

const SearchInput = ({ placeholder, value, onChange, className = '' }) => {
  return (
    <div className="search-input">
      <Search size={20} className="text-gray-400 flex-shrink-0" />
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        className="w-full ml-2 focus:outline-none bg-transparent"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;