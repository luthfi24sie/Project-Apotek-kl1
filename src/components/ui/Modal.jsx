import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Modal Component - Apotek Sehat Design System
 * Border Radius: 10px
 * Overlay: rgba(0,0,0,0.5)
 */
export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  maxWidth = "500px" 
}) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div 
        className="relative w-full bg-white rounded-[10px] shadow-xl border border-border-default overflow-hidden animate-in zoom-in-95 duration-200"
        style={{ maxWidth }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-border-default flex items-center justify-between">
          <h3 className="text-[16px] font-semibold text-text-primary">{title}</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-page-bg transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 bg-page-bg/50 border-t border-border-default flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
