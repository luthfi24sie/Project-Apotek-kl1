import React from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

/**
 * LineChart Component - Apotek Sehat Design System
 * Uses primary color #EF4444 for the chart
 */
export default function LineChart({ data = [], height = 300, title = "Tren Penjualan", subtitle = "Data Penjualan Mingguan" }) {
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
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#64748B' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#64748B' }}
              tickFormatter={(value) => `Rp${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                borderRadius: '8px', 
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontSize: '12px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#EF4444" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
