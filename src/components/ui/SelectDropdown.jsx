import React from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * SelectDropdown Component - Apotek Sehat Design System
 * Border Radius: 6px
 * Height: 36px
 */
export default function SelectDropdown({ 
  label, 
  options = [], 
  error, 
  helperText,
  placeholder,
  className = "", 
  ...props 
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="text-[13px] font-medium text-text-primary">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`w-full bg-white border border-border-default rounded-[6px] h-[36px] px-3 pr-10 text-[13px] outline-none focus:border-primary transition-all text-text-primary appearance-none cursor-pointer ${error ? 'border-error' : ''}`}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
          <ChevronDown size={14} />
        </div>
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
