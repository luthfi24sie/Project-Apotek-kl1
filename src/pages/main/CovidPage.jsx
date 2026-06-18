import React from 'react';
import PageHeader from '../../components/PageHeader';
import { AlertTriangle, Activity, Package, Plus } from 'lucide-react';

const covidInfo = [
  { title: 'Gejala Umum', icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-100', items: ['Demam', 'Batuk', 'Kelelahan', 'Hilang selera'] },
  { title: 'Pencegahan', icon: Activity, color: 'text-blue-600', bgColor: 'bg-blue-100', items: ['Memakai masker', 'Jaga jarak', 'Cuci tangan', 'Hindari keramaian'] },
  { title: 'Vaksinasi', icon: Package, color: 'text-green-600', bgColor: 'bg-green-100', items: ['Dosis 1', 'Dosis 2', 'Booster 1', 'Booster 2'] },
];

export default function CovidPage() {
  return (
    <div className="animate-in space-y-6">
      <PageHeader 
        title="Covid-19"
        subtitle="Informasi dan penanganan Covid-19"
        breadcrumb={[
          { label: 'Dashboard', path: '/' },
          { label: 'Covid-19' },
        ]}
      />

      {/* Hero Card */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white/20 rounded-full">
            <AlertTriangle size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Tetap Waspada Covid-19</h2>
            <p className="text-white/80 mt-1">Lindungi diri dan keluarga dari penularan virus</p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {covidInfo.map((info, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-border-default p-6">
            <div className={`inline-flex p-3 ${info.bgColor} rounded-lg mb-4`}>
              <info.icon className={info.color} size={24} />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-4">{info.title}</h3>
            <ul className="space-y-2">
              {info.items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-text-secondary text-sm">
                  <span className={`w-1.5 h-1.5 rounded-full ${info.color.replace('text-', 'bg-')}`}></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="bg-white rounded-xl shadow-sm border border-border-default p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Hotline Darurat</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-text-secondary">Hotline Kemenkes</p>
            <p className="text-2xl font-bold text-primary">119</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-text-secondary">Hotline Apotek</p>
            <p className="text-2xl font-bold text-primary">(021) 1234-5678</p>
          </div>
        </div>
      </div>
    </div>
  );
}
