import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import { Save, Store, Phone, Mail } from 'lucide-react';

export default function ConfigPage() {
  const [formData, setFormData] = useState({
    pharmacyName: 'Apotek Sehat',
    pharmacyId: 'PH-001',
    address: 'Jl. Kesehatan No. 123, Jakarta Selatan',
    phone: '(021) 1234-5678',
    email: 'info@apoteksehat.com',
    ownerName: 'Dr. Andi Wijaya',
  });

  return (
    <div className="animate-in space-y-6">
      <PageHeader 
        title="Konfigurasi"
        subtitle="Pengaturan umum aplikasi"
        breadcrumb={[
          { label: 'Dashboard', path: '/' },
          { label: 'Konfigurasi' },
        ]}
      />

      <div className="bg-white rounded-xl shadow-sm border border-border-default p-6 max-w-3xl">
        <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
          <Store size={20} className="text-primary" />
          Profil Apotek
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField 
              label="Nama Apotek"
              value={formData.pharmacyName}
              onChange={(e) => setFormData({...formData, pharmacyName: e.target.value})}
            />
            <InputField 
              label="ID Apotek"
              value={formData.pharmacyId}
              onChange={(e) => setFormData({...formData, pharmacyId: e.target.value})}
            />
          </div>
          
          <InputField 
            label="Alamat"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField 
              label="Telepon"
              icon={Phone}
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            <InputField 
              label="Email"
              icon={Mail}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <InputField 
            label="Nama Pemilik"
            value={formData.ownerName}
            onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
          />
          
          <div className="pt-4">
            <Button icon={Save}>Simpan Pengaturan</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
