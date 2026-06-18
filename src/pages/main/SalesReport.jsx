import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import Badge from '../../components/ui/Badge';
import { TrendingUp, DollarSign, ShoppingCart, Users, Download } from 'lucide-react';
import Button from '../../components/ui/Button';

// Data dummy
const salesData = [
  { month: 'Januari', revenue: 12500000, orders: 145, customers: 98 },
  { month: 'Februari', revenue: 15200000, orders: 178, customers: 112 },
  { month: 'Maret', revenue: 13800000, orders: 165, customers: 105 },
  { month: 'April', revenue: 18900000, orders: 210, customers: 142 },
  { month: 'Mei', revenue: 21500000, orders: 245, customers: 168 },
  { month: 'Juni', revenue: 24800000, orders: 280, customers: 195 },
];

const recentTransactions = [
  { id: '#TRX-001', customer: 'Budi Santoso', medicine: 'Paracetamol 500mg', amount: 35000, status: 'Sukses', date: '19 Juni 2024' },
  { id: '#TRX-002', customer: 'Siti Aminah', medicine: 'Amoxicillin 250mg', amount: 125000, status: 'Sukses', date: '19 Juni 2024' },
  { id: '#TRX-003', customer: 'Andi Wijaya', medicine: 'Vitamin C 1000mg', amount: 45000, status: 'Menunggu', date: '18 Juni 2024' },
  { id: '#TRX-004', customer: 'Dewi Lestari', medicine: 'Obat Batuk Syrup', amount: 32000, status: 'Sukses', date: '18 Juni 2024' },
  { id: '#TRX-005', customer: 'Rizky Pratama', medicine: 'Ibuprofen 400mg', amount: 65000, status: 'Batal', date: '17 Juni 2024' },
];

const formatCurrency = (num) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(num);
};

// Simple bar chart component
const SimpleBarChart = () => (
  <div className="h-64 flex items-end justify-between gap-4 px-2">
    {salesData.map((item, index) => (
      <div key={index} className="flex-1 flex flex-col items-center">
        <div 
          className="w-full bg-primary rounded-t-lg transition-all duration-300 hover:bg-primary-dark"
          style={{ height: `${(item.revenue / 25000000) * 100}%` }}
        ></div>
        <span className="text-xs text-text-secondary mt-2">{item.month}</span>
      </div>
    ))}
  </div>
);

export default function SalesReport() {
  const [period, setPeriod] = useState('6months');

  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const totalCustomers = salesData.reduce((sum, item) => sum + item.customers, 0);

  return (
    <div className="animate-in space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageHeader 
          title="Laporan Penjualan"
          subtitle="Laporan transaksi dan pendapatan apotek"
          breadcrumb={[
            { label: 'Dashboard', path: '/' },
            { label: 'Laporan', path: '/reports/sales' },
            { label: 'Penjualan' },
          ]}
        />
        <div className="flex items-center gap-3">
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border border-border-default rounded-lg px-4 py-2 text-sm bg-white"
          >
            <option value="1month">1 Bulan Terakhir</option>
            <option value="3months">3 Bulan Terakhir</option>
            <option value="6months">6 Bulan Terakhir</option>
            <option value="1year">1 Tahun Terakhir</option>
          </select>
          <Button icon={Download}>Unduh Laporan</Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-border-default p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="text-green-600 size-6" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <TrendingUp size={14} />
              <span>+12.5%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-text-primary">{formatCurrency(totalRevenue)}</h3>
          <p className="text-text-secondary text-sm">Total Pendapatan</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-border-default p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingCart className="text-blue-600 size-6" />
            </div>
            <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
              <TrendingUp size={14} />
              <span>+8.2%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-text-primary">{totalOrders}</h3>
          <p className="text-text-secondary text-sm">Total Pesanan</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-border-default p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="text-purple-600 size-6" />
            </div>
            <div className="flex items-center gap-1 text-purple-600 text-sm font-medium">
              <TrendingUp size={14} />
              <span>+5.1%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-text-primary">{totalCustomers}</h3>
          <p className="text-text-secondary text-sm">Total Pelanggan</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-border-default p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-text-primary">Grafik Pendapatan</h3>
          </div>
          <SimpleBarChart />
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-border-default p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4">Transaksi Terbaru</h3>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between pb-4 border-b border-border-default last:border-0">
                <div>
                  <p className="text-sm font-semibold text-text-primary">{transaction.customer}</p>
                  <p className="text-xs text-text-secondary">{transaction.medicine}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-text-primary">{formatCurrency(transaction.amount)}</p>
                  <Badge variant={
                    transaction.status === 'Sukses' ? 'success' : 
                    transaction.status === 'Menunggu' ? 'info' : 'error'
                  }>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
