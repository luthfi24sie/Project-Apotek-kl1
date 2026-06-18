import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import Badge from '../../components/ui/Badge';
import { TrendingUp, DollarSign, ShoppingCart, Users, Download } from 'lucide-react';
import Button from '../../components/ui/Button';
import LineChart from '../../components/ui/LineChart';
import BarChart from '../../components/ui/BarChart';

// Data dummy
const salesDataMonthly = [
  { name: 'Jan', value: 12500000 },
  { name: 'Feb', value: 15200000 },
  { name: 'Mar', value: 13800000 },
  { name: 'Apr', value: 18900000 },
  { name: 'Mei', value: 21500000 },
  { name: 'Jun', value: 24800000 },
];

const ordersData = [
  { name: 'Jan', value: 145 },
  { name: 'Feb', value: 178 },
  { name: 'Mar', value: 165 },
  { name: 'Apr', value: 210 },
  { name: 'Mei', value: 245 },
  { name: 'Jun', value: 280 },
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

export default function SalesReport() {
  const [period, setPeriod] = useState('6months');
  const [chartType, setChartType] = useState('line');

  const totalRevenue = 106700000;
  const totalOrders = 1223;
  const totalCustomers = 820;

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
            className="border border-border-default rounded-lg px-4 py-2 text-sm bg-card-bg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
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
        <div className="bg-card-bg dark:bg-slate-800 rounded-xl shadow-sm border border-border-default dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <DollarSign className="text-green-600 dark:text-green-400 size-6" />
            </div>
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
              <TrendingUp size={14} />
              <span>+12.5%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-text-primary dark:text-white">{formatCurrency(totalRevenue)}</h3>
          <p className="text-text-secondary dark:text-slate-400 text-sm">Total Pendapatan</p>
        </div>

        <div className="bg-card-bg dark:bg-slate-800 rounded-xl shadow-sm border border-border-default dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ShoppingCart className="text-blue-600 dark:text-blue-400 size-6" />
            </div>
            <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium">
              <TrendingUp size={14} />
              <span>+8.2%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-text-primary dark:text-white">{totalOrders}</h3>
          <p className="text-text-secondary dark:text-slate-400 text-sm">Total Pesanan</p>
        </div>

        <div className="bg-card-bg dark:bg-slate-800 rounded-xl shadow-sm border border-border-default dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Users className="text-purple-600 dark:text-purple-400 size-6" />
            </div>
            <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400 text-sm font-medium">
              <TrendingUp size={14} />
              <span>+5.1%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-text-primary dark:text-white">{totalCustomers}</h3>
          <p className="text-text-secondary dark:text-slate-400 text-sm">Total Pelanggan</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 space-y-6">
          <LineChart data={salesDataMonthly} />
          <BarChart data={ordersData} />
        </div>

        {/* Recent Transactions */}
        <div className="bg-card-bg dark:bg-slate-800 rounded-xl shadow-sm border border-border-default dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold text-text-primary dark:text-white mb-4">Transaksi Terbaru</h3>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between pb-4 border-b border-border-default dark:border-slate-700 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-text-primary dark:text-white">{transaction.customer}</p>
                  <p className="text-xs text-text-secondary dark:text-slate-400">{transaction.medicine}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-text-primary dark:text-white">{formatCurrency(transaction.amount)}</p>
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
