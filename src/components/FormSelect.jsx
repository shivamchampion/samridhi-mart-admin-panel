// src/components/FormSelect.jsx
import { forwardRef } from 'react';
import FormLabel from './FormLabel';

const FormSelect = forwardRef(({ 
  label, 
  id, 
  options = [], 
  required, 
  helper, 
  error, 
  placeholder = 'Select an option',
  className = '',
  labelClassName = '',
  isAnimated = true,
  ...props 
}, ref) => {
  return (
    <div className={`form-group transition-all duration-200 ease-in-out ${isAnimated ? 'hover:-translate-y-0.5' : ''}`}>
      {label && (
        <FormLabel htmlFor={id} required={required} className={labelClassName}>
          {label}
        </FormLabel>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={id}
          className={`form-select ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
          required={required}
          {...props}
        >
          {placeholder && (
            <option value="">{placeholder}</option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
          <div className="w-0 h-0 border-t-[6px] border-r-[5px] border-l-[5px] border-t-gray-400 border-r-transparent border-l-transparent transition-transform duration-200 group-hover:translate-y-0.5" />
        </div>
      </div>
      {helper && !error && (
        <p className="mt-1 text-sm text-gray-500 transition-opacity duration-200">{helper}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500 animate-fadeIn">{error}</p>
      )}
    </div>
  );
});

FormSelect.displayName = 'FormSelect';

export default FormSelect;