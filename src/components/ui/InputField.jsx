import React from 'react';

/**
 * InputField Component - Apotek Sehat Design System
 * Border Radius: 6px
 * Height: 36px (for md size)
 * Focus Border: #EF4444
 */
export default function InputField({ 
  label, 
  error, 
  helperText, 
  icon: Icon, 
  className = "", 
  type = "text",
  ...props 
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="text-[13px] font-medium text-text-primary">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
            <Icon size={16} />
          </div>
        )}
        <input
          type={inputType}
          className={`w-full bg-white border border-border-default rounded-[6px] h-[36px] ${Icon ? 'pl-10' : 'px-3'} ${isPassword ? 'pr-10' : 'pr-3'} text-[13px] outline-none focus:border-primary transition-all text-text-primary placeholder:text-text-muted ${error ? 'border-error' : ''}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
          >
            {/* Using a simple eye toggle logic */}
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88L4.62 4.62"/><path d="M1 1l22 22"/><path d="M14.47 14.47l-1.42-1.42"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><circle cx="12" cy="12" r="3"/><path d="M12 12l0 0"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-[11px] text-error">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-[11px] text-text-secondary">
          {helperText}
        </p>
      )}
    </div>
  );
}
