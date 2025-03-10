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
  ...props 
}, ref) => {
  return (
    <div className="form-group">
      {label && (
        <FormLabel htmlFor={id} required={required} className={labelClassName}>
          {label}
        </FormLabel>
      )}
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
      {helper && !error && (
        <p className="mt-1 text-sm text-gray-500">{helper}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

FormSelect.displayName = 'FormSelect';

export default FormSelect;