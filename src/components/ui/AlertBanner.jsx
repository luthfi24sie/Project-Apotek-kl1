import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

/**
 * AlertBanner Component - Apotek Sehat Design System
 * Variant: success, warning, error, info
 * Border Radius: 6px
 */
export default function AlertBanner({ 
  variant = "info", 
  title, 
  children, 
  onDismiss,
  className = "" 
}) {
  const configs = {
    success: { icon: CheckCircle2, styles: "bg-success/10 border-success/20 text-success" },
    warning: { icon: AlertTriangle, styles: "bg-warning/10 border-warning/20 text-warning" },
    error: { icon: AlertCircle, styles: "bg-error/10 border-error/20 text-error" },
    info: { icon: Info, styles: "bg-info/10 border-info/20 text-info" },
  };

  const { icon: Icon, styles } = configs[variant] || configs.info;

  return (
    <div className={`p-4 rounded-[6px] border flex gap-3 relative ${styles} ${className}`}>
      <div className="shrink-0">
        <Icon size={18} />
      </div>
      <div className="flex-1">
        {title && <p className="font-semibold text-[14px] mb-0.5">{title}</p>}
        <div className="text-[13px] font-medium opacity-90">{children}</div>
      </div>
      {onDismiss && (
        <button 
          onClick={onDismiss}
          className="shrink-0 hover:opacity-60 transition-opacity"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
