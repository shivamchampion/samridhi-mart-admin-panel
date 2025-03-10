// src/components/DateInput.jsx
import { Calendar } from 'lucide-react';

const DateInput = ({ label, value, onChange, required, disabled, className = '' }) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
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
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
        />
      </div>
    </div>
  );
};

export default DateInput;