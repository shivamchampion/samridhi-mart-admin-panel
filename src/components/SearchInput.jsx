// src/components/SearchInput.jsx
import { Search } from 'lucide-react';

const SearchInput = ({ placeholder, value, onChange, className = '' }) => {
  return (
    <div className="search-input group transition-all duration-200 ease-in-out hover:shadow-md">
      <Search size={20} className="text-gray-400 flex-shrink-0 group-hover:text-indigo-500 transition-colors duration-200" />
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        className="w-full ml-2 focus:outline-none bg-transparent transition-all duration-200"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
