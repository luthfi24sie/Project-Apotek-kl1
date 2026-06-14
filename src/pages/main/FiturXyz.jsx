import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { ChevronDown, Check } from 'lucide-react';
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

/**
 * 3 Komponen UI Reusable Baru (Pertemuan 11):
 * 1. Accordion - List yang bisa di-expand/collapse
 * 2. Tabs - Navigasi antar konten dalam satu halaman
 * 3. Switch - Toggle switch on/off
 */

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border border-border-default rounded-[8px] overflow-hidden bg-white">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-page-bg transition-colors"
          >
            <span className="text-[14px] font-semibold text-text-primary">{item.title}</span>
            <ChevronDown 
              size={18} 
              className={`text-text-secondary transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`} 
            />
          </button>
          {openIndex === index && (
            <div className="p-4 pt-0 text-[13px] text-text-secondary border-t border-border-default bg-white animate-in slide-in-from-top-1 duration-200">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="space-y-4">
      <div className="flex border-b border-border-default">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-[13px] font-medium transition-all relative
              ${activeTab === tab.id ? 'text-primary' : 'text-text-secondary hover:text-text-primary'}
            `}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-in fade-in zoom-in duration-300" />
            )}
          </button>
        ))}
      </div>
      <div className="bg-white p-6 rounded-[8px] border border-border-default min-h-[150px] animate-in fade-in slide-in-from-left-2 duration-300">
        {tabs.find(t => t.id === activeTab)?.content}
      </div>
    </div>
  );
};

const Switch = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div 
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors duration-200 flex items-center px-1
          ${checked ? 'bg-primary' : 'bg-slate-300'}
        `}
      >
        <div className={`size-3.5 bg-white rounded-full shadow-sm transition-transform duration-200 
          ${checked ? 'translate-x-5' : 'translate-x-0'}
        `} />
      </div>
      {label && <span className="text-[13px] text-text-primary font-medium">{label}</span>}
    </label>
  );
};

export default function FiturXyz() {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const accordionItems = [
    { 
      title: "Apa itu Apotek Sehat CRM?", 
      content: "Apotek Sehat CRM adalah sistem manajemen hubungan pelanggan yang dirancang khusus untuk operasional apotek modern, membantu mengelola inventaris, resep, dan loyalitas pasien." 
    },
    { 
      title: "Bagaimana cara menambah stok obat?", 
      content: "Anda dapat menambah stok obat melalui menu Inventaris > Daftar Obat, lalu klik tombol 'Tambah Obat' di pojok kanan atas." 
    },
    { 
      title: "Apakah data transaksi aman?", 
      content: "Ya, seluruh data transaksi dienkripsi dan disimpan dengan standar keamanan tinggi untuk menjaga privasi pasien dan integritas data apotek." 
    }
  ];

  const tabsContent = [
    { 
      id: 'info', 
      label: 'Informasi Umum', 
      content: (
        <div className="space-y-3">
          <p className="font-semibold text-text-primary">Tentang Fitur XYZ</p>
          <p className="leading-relaxed">Halaman ini mendemonstrasikan implementasi 3 komponen UI baru yang dibangun khusus untuk Pertemuan 11 menggunakan standar desain Apotek Sehat.</p>
          <ul className="list-disc list-inside space-y-1 text-text-secondary">
            <li>Komponen Accordion untuk FAQ</li>
            <li>Komponen Tabs untuk navigasi konten</li>
            <li>Komponen Switch untuk pengaturan</li>
          </ul>
        </div>
      )
    },
    { 
      id: 'settings', 
      label: 'Pengaturan', 
      content: (
        <div className="space-y-6">
          <p className="font-semibold text-text-primary">Preferensi Pengguna</p>
          <div className="space-y-4">
            <Switch 
              label="Aktifkan Notifikasi Email" 
              checked={isNotificationEnabled} 
              onChange={setIsNotificationEnabled} 
            />
            <Switch 
              label="Mode Gelap (Beta)" 
              checked={isDarkMode} 
              onChange={setIsDarkMode} 
            />
          </div>
        </div>
      )
    },
    { 
      id: 'help', 
      label: 'Bantuan', 
      content: (
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
            <Check size={24} />
          </div>
          <p className="font-medium text-text-primary">Sistem Siap Digunakan</p>
          <p className="text-[12px] text-text-secondary mt-1">Jika butuh bantuan lebih lanjut, silakan hubungi tim IT Apotek Sehat.</p>
        </div>
      )
    }
  ];

  return (
    <div id="fitur-xyz-container" className="space-y-8 animate-in fade-in duration-500">
      <PageHeader 
        title="Fitur XYZ" 
        subtitle="Halaman demonstrasi komponen UI baru untuk Pertemuan 11."
        breadcrumb={[
          { label: "Dashboard", path: "/" },
          { label: "Fitur XYZ" }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section Accordion */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <h3 className="text-[16px] font-bold text-text-primary">Tanya Jawab (Accordion)</h3>
            <p className="text-[12px] text-text-secondary">Contoh penggunaan komponen Accordion untuk informasi FAQ.</p>
          </div>
          <Accordion items={accordionItems} />
          
          <div className="pt-6 space-y-4">
             <h3 className="text-[16px] font-bold text-text-primary">shadcn/ui Button Variants</h3>
             <div className="flex flex-wrap gap-2">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
             </div>
          </div>
        </div>

        {/* Section Tabs & Switch */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <h3 className="text-[16px] font-bold text-text-primary">Konten & Pengaturan (Tabs)</h3>
            <p className="text-[12px] text-text-secondary">Contoh penggunaan komponen Tabs dan Switch.</p>
          </div>
          <Tabs tabs={tabsContent} />

          <Card className="mt-4 w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Belajar shadcn/ui</CardTitle>
                <Badge variant="secondary">Baru</Badge>
              </div>
              <CardDescription>
                Contoh penggunaan komponen shadcn/ui di React
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-text-secondary">
                Komponen ini dibuat di branch <strong>setup-shadcnui-fitur</strong> 
                lalu di-merge ke main.
              </p>
            </CardContent>

            <CardFooter className="flex gap-2">
              <Button>Simpan</Button>
              <Button variant="outline">Batal</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-primary/5 border border-primary/10 p-4 rounded-[8px] text-center">
        <p className="text-[13px] text-primary font-medium">
          Ini adalah Halaman Fitur Xyz - Implementasi Tugas Pertemuan 11
        </p>
      </div>
    </div>
  );
}
