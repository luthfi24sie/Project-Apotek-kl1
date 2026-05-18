import React from 'react';
import { ChevronLeft, ChevronRight, Edit2, Trash2 } from 'lucide-react';

/**
 * DataTable Component - Apotek Sehat Design System
 * Props: columns[], data[], onSort, onDelete, onEdit
 * Row height: 48px
 */
export default function DataTable({ 
  columns = [], 
  data = [], 
  onEdit,
  onDelete,
  pagination = true,
  className = "" 
}) {
  return (
    <div className={`bg-white rounded-[8px] border border-border-default overflow-hidden ${className}`}>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-border-default sticky top-0 z-10">
              {columns.map((col, i) => (
                <th 
                  key={i} 
                  className="px-6 py-3.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-3.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider text-right">
                  Aksi
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-[#F8FAFC] transition-colors h-[48px]">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-2 text-[13px] text-text-primary">
                      {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onEdit && (
                          <button 
                            onClick={() => onEdit(row)}
                            className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>
                        )}
                        {onDelete && (
                          <button 
                            onClick={() => onDelete(row)}
                            className="p-1.5 text-error hover:bg-error/5 rounded-md transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} 
                  className="px-6 py-10 text-center text-text-muted text-[13px]"
                >
                  Tidak ada data tersedia
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && data.length > 0 && (
        <div className="px-6 py-3 bg-white border-t border-border-default flex items-center justify-between">
          <p className="text-[12px] text-text-secondary">
            Menampilkan <span className="font-semibold text-text-primary">1 - {data.length}</span> dari <span className="font-semibold text-text-primary">{data.length}</span> data
          </p>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded-md border border-border-default text-text-muted hover:bg-page-bg disabled:opacity-30 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1">
              <button className="size-8 flex items-center justify-center rounded-md bg-primary text-white text-[12px] font-semibold">1</button>
            </div>
            <button className="p-1 rounded-md border border-border-default text-text-muted hover:bg-page-bg disabled:opacity-30 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
