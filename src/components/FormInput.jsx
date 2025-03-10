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
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
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
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
            {rightIcon}
          </div>
        )}
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

FormInput.displayName = 'FormInput';

export default FormInput;