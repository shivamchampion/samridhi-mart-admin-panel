// src/components/DateInput.jsx
import { Calendar } from 'lucide-react';

const DateInput = ({ label, value, onChange, required, disabled, className = '' }) => {
  return (
    <div className="form-group transition-all duration-200 ease-in-out hover:-translate-y-0.5">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-red-500 ml-1 animate-pulse">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          value={value || ''}
          onChange={onChange}
          className={`form-input pr-10 ${className}`}
          required={required}
          disabled={disabled}
        />
        <Calendar 
          size={16} 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-colors duration-200 group-hover:text-indigo-500" 
        />
      </div>
    </div>
  );
};

export default DateInput;