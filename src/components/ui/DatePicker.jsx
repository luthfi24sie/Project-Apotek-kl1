import React from 'react';
import { Calendar } from 'lucide-react';

export default function DatePicker({ label, error, className = "", ...props }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-black text-text-primary uppercase tracking-widest ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">
          <Calendar size={16} />
        </div>
        <input
          type="date"
          className={`w-full bg-white border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-medium text-text-primary cursor-pointer ${error ? 'border-error focus:border-error focus:ring-error/10' : ''}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-[10px] font-bold text-error ml-1 uppercase tracking-wide">
          {error}
        </p>
      )}
    </div>
  );
}
