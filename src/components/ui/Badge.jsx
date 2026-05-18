import React from 'react';

/**
 * Badge Component - Apotek Sehat Design System
 * Variant: success, warning, error, info, neutral
 * Border Radius: 6px
 */
export default function Badge({ children, variant = "info", className = "" }) {
  const variants = {
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    error: "bg-error/10 text-error border-error/20",
    info: "bg-info/10 text-info border-info/20",
    neutral: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <span className={`px-2 py-0.5 rounded-[6px] text-[11px] font-medium border inline-flex items-center justify-center ${variants[variant] || variants.info} ${className}`}>
      {children}
    </span>
  );
}
