import React from 'react';
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

/**
 * BarChart Component - Apotek Sehat Design System
 */
export default function BarChart({ data = [], height = 300, title = "Stok Obat", subtitle = "Per Kategori" }) {
  const COLORS = ['#EF4444', '#3B82F6', '#22C55E', '#F59E0B', '#64748B'];

  return (
    <div className="bg-white rounded-[8px] border border-border-default p-6 h-full shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[16px] font-semibold text-text-primary leading-tight">{title}</h3>
          <p className="text-[13px] text-text-secondary mt-1">{subtitle}</p>
        </div>
      </div>
      
      <div style={{ width: '100%', height: height }}>
        <ResponsiveContainer>
          <ReBarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
            <XAxis 
              type="number"
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#64748B' }}
            />
            <YAxis 
              type="category"
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#1E293B' }}
              width={100}
            />
            <Tooltip 
              cursor={{ fill: '#F8FAFC' }}
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                borderRadius: '8px', 
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
