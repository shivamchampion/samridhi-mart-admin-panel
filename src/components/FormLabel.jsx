// src/components/FormLabel.jsx
const FormLabel = ({ children, required, htmlFor, className = '' }) => {
    return (
      <label 
        htmlFor={htmlFor} 
        className={`block text-sm font-medium text-gray-700 mb-1.5 ${className}`}
      >
        {children}
        {required && <span className="text-red-500 ml-1 animate-pulse">*</span>}
      </label>
    );
  };
  
  export default FormLabel;