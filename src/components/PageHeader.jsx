import React from 'react';
import BreadcrumbNav from './ui/BreadcrumbNav';

/**
 * PageHeader Component - Apotek Sehat Design System
 * Judul halaman kiri (H1 font-size 20px font-weight 600)
 * Subtitle/deskripsi di bawah judul, text-secondary font-size 13px
 * Tombol aksi di kanan (misal "+ Add Medicine" warna #EF4444)
 */
export default function PageHeader({ 
  title, 
  subtitle, 
  breadcrumb = [], 
  children,
  className = "" 
}) {
  return (
    <div className={`flex flex-col gap-4 mb-6 ${className}`}>
      {breadcrumb.length > 0 && (
        <BreadcrumbNav items={breadcrumb} />
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-[20px] font-semibold text-text-primary leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[13px] text-text-secondary mt-1">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {children}
        </div>
      </div>
    </div>
  );
}
