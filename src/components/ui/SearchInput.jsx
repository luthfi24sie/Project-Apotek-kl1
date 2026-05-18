import React from 'react';
import { Search } from 'lucide-react';

/**
 * SearchInput Component - Apotek Sehat Design System
 * Used within pages (e.g., inside cards or above tables)
 */
export default function SearchInput({ 
  placeholder = "Cari di sini...", 
  value, 
  onChange, 
  className = "",
  ...props 
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
        <Search size={16} />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-[36px] bg-white border border-border-default rounded-[6px] pl-10 pr-4 text-[13px] text-text-primary outline-none focus:border-primary transition-all placeholder:text-text-muted"
        {...props}
      />
    </div>
  );
}
