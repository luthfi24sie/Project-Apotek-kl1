import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ 
  message, 
  variant = "success", 
  duration = 3000, 
  onClose 
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const variants = {
    success: "bg-success text-white",
    error: "bg-error text-white",
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl animate-in slide-in-from-right-10 duration-300 ${variants[variant]}`}>
      {variant === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
      <p className="text-sm font-bold tracking-tight">{message}</p>
      <button onClick={() => setIsVisible(false)} className="ml-2 opacity-70 hover:opacity-100">
        <X size={16} />
      </button>
    </div>
  );
}
