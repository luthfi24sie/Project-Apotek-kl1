import React from 'react';
import { NavLink } from "react-router-dom";

export default function NavItem({ to, icon: Icon, label, badge }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group
        ${isActive ? 
            "bg-primary text-white font-semibold shadow-md" : 
            "text-gray-400 hover:bg-gray-800 hover:text-white" 
        }`
      }
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon size={20} />}
        <span className="text-sm">{label}</span>
      </div>
      
      {badge && (
        <span className="bg-primary-light text-primary text-[10px] font-black px-1.5 py-0.5 rounded-md group-hover:bg-white transition-colors">
          {badge}
        </span>
      )}
    </NavLink>
  );
}
