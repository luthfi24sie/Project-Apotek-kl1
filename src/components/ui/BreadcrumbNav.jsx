import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * BreadcrumbNav Component - Apotek Sehat Design System
 * Example: "Inventory › List of Medicines › Azithral 500 Tablet"
 * Separator "›", warna muted, item terakhir bold
 */
export default function BreadcrumbNav({ items = [], className = "" }) {
  return (
    <nav className={`flex items-center gap-1.5 text-[13px] ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={index}>
            {item.path && !isLast ? (
              <Link 
                to={item.path} 
                className="text-text-secondary hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-text-primary font-semibold" : "text-text-secondary"}>
                {item.label}
              </span>
            )}
            {!isLast && (
              <ChevronRight size={14} className="text-text-muted" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
