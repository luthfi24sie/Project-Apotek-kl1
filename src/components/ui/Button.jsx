import React from 'react';

/**
 * Button Component - Apotek Sehat Design System
 * Variant: primary (#EF4444), secondary (outline #EF4444), danger (outline merah), ghost
 * Size: sm, md, lg
 * Border Radius: 6px
 */
export default function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "", 
  icon: Icon,
  loading = false,
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-[6px]";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover",
    secondary: "bg-white text-primary border border-primary hover:bg-primary/5",
    danger: "bg-white text-error border border-error hover:bg-error/5",
    ghost: "bg-transparent text-text-secondary hover:bg-page-bg hover:text-text-primary",
  };

  const sizes = {
    sm: "px-3 py-1 text-[12px] h-[32px]",
    md: "px-4 py-2 text-[13px] h-[36px]",
    lg: "px-6 py-3 text-[14px] h-[44px]",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && <Icon size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />}
          {children}
        </>
      )}
    </button>
  );
}
