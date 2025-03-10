// src/components/FormInput.jsx
import { forwardRef } from 'react';
import FormLabel from './FormLabel';

const FormInput = forwardRef(({ 
  label, 
  id, 
  type = 'text', 
  required, 
  helper, 
  error, 
  leftIcon, 
  rightIcon, 
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
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          className={`form-input ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
          required={required}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
      {helper && !error && (
        <p className="mt-1 text-sm text-gray-500">{helper}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;