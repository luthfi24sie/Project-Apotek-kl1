import React from 'react';

export default function Avatar({ name, size = "md" }) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
  };

  return (
    <div className={`${sizes[size]} rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-primary`}>
      {name ? name.charAt(0).toUpperCase() : "?"}
    </div>
  );
}
