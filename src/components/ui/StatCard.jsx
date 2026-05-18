import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

/**
 * StatCard Component - Apotek Sehat Design System
 * Props: icon, label, value, change (%), changeType (up/down)
 * Border Radius: 8px
 */
export default function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  change, 
  changeType, 
  className = "" 
}) {
  const isUp = changeType === "up";
  
  return (
    <div className={`bg-white rounded-[8px] border border-border-default p-5 flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="size-10 rounded-full bg-page-bg flex items-center justify-center text-text-muted">
          {Icon && <Icon size={20} />}
        </div>
        {change && (
          <div className={`flex items-center gap-0.5 text-[12px] font-semibold ${isUp ? 'text-success' : 'text-error'}`}>
            {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            <span>{change}%</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col">
        <h3 className="text-[20px] font-semibold text-text-primary leading-tight">{value}</h3>
        <p className="text-[13px] text-text-secondary mt-1">{label}</p>
      </div>
    </div>
  );
}
