import React from 'react';
import PageHeader from '../../components/PageHeader';
import { Bell, CheckCircle, AlertTriangle, MessageSquare } from 'lucide-react';

const notifications = [
  { id: 1, title: 'Stok Obat Habis', message: 'Paracetamol 500mg hampir habis!', time: '5 menit lalu', type: 'warning' },
  { id: 2, title: 'Resep Baru', message: 'Ada resep baru yang perlu diproses!', time: '1 jam lalu', type: 'info' },
  { id: 3, title: 'Pembayaran Sukses', message: 'Pembayaran transaksi #TRX-001 berhasil!', time: '2 jam lalu', type: 'success' },
  { id: 4, title: 'Obat Kadaluarsa', message: 'Vitamin C 1000mg akan kadaluarsa besok!', time: '3 jam lalu', type: 'error' },
  { id: 5, title: 'Pelanggan Baru', message: 'Siti Aminah telah mendaftar!', time: '1 hari lalu', type: 'info' },
];

export default function NotificationsPage() {
  return (
    <div className="animate-in space-y-6">
      <PageHeader 
        title="Notifikasi"
        subtitle="Pemberitahuan penting untuk Anda"
        breadcrumb={[
          { label: 'Dashboard', path: '/' },
          { label: 'Notifikasi' },
        ]}
      />

      <div className="bg-white rounded-xl shadow-sm border border-border-default divide-y divide-border-default">
        {notifications.map((notif) => (
          <div key={notif.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-full ${
                notif.type === 'success' ? 'bg-green-100' :
                notif.type === 'warning' ? 'bg-orange-100' :
                notif.type === 'error' ? 'bg-red-100' :
                'bg-blue-100'
              }`}>
                {notif.type === 'success' ? <CheckCircle size={18} className="text-green-600" /> :
                 notif.type === 'warning' ? <AlertTriangle size={18} className="text-orange-600" /> :
                 notif.type === 'error' ? <AlertTriangle size={18} className="text-red-600" /> :
                 <Bell size={18} className="text-blue-600" />
                }
              </div>
              <div className="flex-1">
                <p className="font-semibold text-text-primary">{notif.title}</p>
                <p className="text-text-secondary text-sm mt-1">{notif.message}</p>
                <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
