import React from 'react';
import PageHeader from '../../components/PageHeader';
import { Pill, AlertTriangle, TrendingDown, Activity, CheckCircle } from 'lucide-react';

const pharmacyStats = [
  { label: 'Total Obat Tersedia', value: 298, icon: Pill, color: 'text-cyan-600', bgColor: 'bg-cyan-100' },
  { label: 'Obat Hampir Habis', value: 12, icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-100' },
  { label: 'Obat Kadaluarsa', value: 3, icon: TrendingDown, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { label: 'Resep Diproses', value: 25, icon: Activity, color: 'text-purple-600', bgColor: 'bg-purple-100' },
];

const stockWarnings = [
  { name: 'Paracetamol 500mg', stock: 5, threshold: 20, status: 'danger' },
  { name: 'Amoxicillin 250mg', stock: 10, threshold: 30, status: 'warning' },
  { name: 'Vitamin C 1000mg', stock: 15, threshold: 25, status: 'warning' },
  { name: 'Ibuprofen 400mg', stock: 45, threshold: 20, status: 'safe' },
];

export default function PharmacyReport() {
  return (
    <div className="animate-in space-y-6">
      <PageHeader 
        title="Laporan Apotek"
        subtitle="Laporan operasional dan stok apotek"
        breadcrumb={[
          { label: 'Dashboard', path: '/' },
          { label: 'Laporan', path: '/reports/pharmacy' },
          { label: 'Apotek' },
        ]}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pharmacyStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-border-default p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                <p className="text-text-secondary text-sm">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stock Warnings */}
      <div className="bg-white rounded-xl shadow-sm border border-border-default p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Peringatan Stok</h3>
        <div className="space-y-3">
          {stockWarnings.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {item.status === 'danger' ? (
                  <div className="p-2 bg-red-100 rounded-full">
                    <AlertTriangle className="text-red-600 size-5" />
                  </div>
                ) : item.status === 'warning' ? (
                  <div className="p-2 bg-orange-100 rounded-full">
                    <AlertTriangle className="text-orange-600 size-5" />
                  </div>
                ) : (
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="text-green-600 size-5" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-text-primary">{item.name}</p>
                  <p className="text-sm text-text-secondary">Stok: {item.stock} / Minimal {item.threshold}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.status === 'danger' ? 'bg-red-100 text-red-700' :
                item.status === 'warning' ? 'bg-orange-100 text-orange-700' :
                'bg-green-100 text-green-700'
              }`}>
                {item.status === 'danger' ? 'Hampir Habis' : item.status === 'warning' ? 'Perlu Diisi' : 'Aman'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
