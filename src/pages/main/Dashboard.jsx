import React from 'react';
import { 
  ReceiptText, 
  Users, 
  AlertTriangle, 
  ArrowRight,
  Package,
  Activity,
  Plus
} from "lucide-react"; 
import StatCard from "../../components/ui/StatCard";
import DataTable from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import LineChart from "../../components/ui/LineChart";
import BarChart from "../../components/ui/BarChart";
import PageHeader from "../../components/PageHeader";

export default function Dashboard() { 
    const recentOrders = [
        { id: "#RX-7721", patient: "Siti Aminah", medicine: "Paracetamol 500mg", total: "Rp 15.000", status: "Selesai", type: "Resep" },
        { id: "#RX-7722", patient: "Budi Santoso", medicine: "Amoxicillin", total: "Rp 45.000", status: "Diproses", type: "Resep" },
        { id: "#RX-7723", patient: "Andi Wijaya", medicine: "Vitamin C 1000mg", total: "Rp 120.000", status: "Batal", type: "Bebas" },
        { id: "#RX-7724", patient: "Dewi Lestari", medicine: "Obat Batuk Syrup", total: "Rp 32.000", status: "Selesai", type: "Bebas" },
    ];

    const salesData = [
      { name: 'Sen', value: 1200000 },
      { name: 'Sel', value: 1900000 },
      { name: 'Rab', value: 1500000 },
      { name: 'Kam', value: 2200000 },
      { name: 'Jum', value: 3000000 },
      { name: 'Sab', value: 2800000 },
      { name: 'Min', value: 1800000 },
    ];

    const stockData = [
      { name: 'Obat Bebas', value: 400 },
      { name: 'Obat Keras', value: 300 },
      { name: 'Vitamin', value: 200 },
      { name: 'Alat Kesehatan', value: 150 },
      { name: 'Lainnya', value: 100 },
    ];

    const columns = [
      { header: "No. Resep", accessor: "id", render: (val) => <span className="font-semibold text-primary">{val}</span> },
      { header: "Pasien", accessor: "patient", render: (val) => (
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-semibold text-slate-500">
            {val.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="font-medium text-text-primary">{val}</span>
        </div>
      )},
      { header: "Obat", accessor: "medicine", render: (val, row) => (
        <div>
          <p className="text-[13px] font-medium text-text-primary">{val}</p>
          <p className="text-[11px] text-text-secondary">{row.type}</p>
        </div>
      )},
      { header: "Status", accessor: "status", render: (val) => (
        <Badge variant={val === 'Selesai' ? 'success' : val === 'Diproses' ? 'info' : 'error'}>
          {val}
        </Badge>
      )},
      { header: "Total", accessor: "total", render: (val) => <span className="font-medium text-text-primary">{val}</span> },
    ];

    return ( 
        <div id="dashboard-container" className="space-y-6"> 
            <PageHeader 
                title="Ringkasan Apotek" 
                subtitle="Pantau performa Apotek Sehat hari ini."
            >
                <Button icon={Plus}>Input Resep Baru</Button>
            </PageHeader>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  icon={Package} 
                  label="Total Obat" 
                  value="1,240" 
                  change={12} 
                  changeType="up"
                />
                <StatCard 
                  icon={ReceiptText} 
                  label="Resep Masuk" 
                  value="85" 
                  change={5} 
                  changeType="up"
                />
                <StatCard 
                  icon={Users} 
                  label="Pasien Baru" 
                  value="12" 
                  change={2} 
                  changeType="down"
                />
                <StatCard 
                  icon={AlertTriangle} 
                  label="Stok Menipis" 
                  value="4" 
                  change={0}
                  changeType="up"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LineChart data={salesData} />
              <BarChart data={stockData} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[16px] font-semibold text-text-primary">Transaksi Terbaru</h3>
                      <Button variant="ghost" size="sm" icon={ArrowRight}>Lihat Semua</Button>
                    </div>
                    <DataTable columns={columns} data={recentOrders} pagination={false} />
                </div>

                {/* Quick Info Sidebar Card */}
                <div className="bg-primary p-6 rounded-[8px] text-white flex flex-col justify-between shadow-lg shadow-primary/20">
                    <div>
                        <div className="bg-white/20 size-12 rounded-[6px] flex items-center justify-center mb-6">
                            <Activity size={24} />
                        </div>
                        <h3 className="text-[20px] font-semibold mb-2 leading-tight">Antrian Resep</h3>
                        <p className="text-white/80 text-[13px] mb-8">
                          Ada <span className="text-white font-bold underline">8 resep</span> yang perlu divalidasi oleh apoteker hari ini.
                        </p>
                        
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white/10 p-3 rounded-[6px] border border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="size-1.5 bg-success rounded-full" />
                                        <span className="text-[12px] font-medium">Resep #RX-772{i+4}</span>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase opacity-60 tracking-wider">Baru</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button className="w-full mt-8 bg-white text-primary hover:bg-white/90" size="lg">
                        Buka Antrian Resep
                    </Button>
                </div>
            </div>
        </div> 
    ); 
} 
