import React, { useState, useMemo } from 'react';
import { Search, UserPlus, Filter, Download } from 'lucide-react';
import Button from "../../components/ui/Button";
import DataTable from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import InputField from "../../components/ui/InputField";
import SelectDropdown from "../../components/ui/SelectDropdown";
import PageHeader from "../../components/PageHeader";
import SearchInput from "../../components/ui/SearchInput";
import { customersSeed } from "./customersSeed";

export default function Customers() {
    const [customers, setCustomers] = useState(customersSeed);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [filterLoyalty, setFilterLoyalty] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");
    
    const [form, setForm] = useState({
        customerName: "",
        email: "",
        phone: "",
        loyalty: "Bronze",
        gender: "Laki-laki",
        city: "Jakarta",
        status: "Aktif"
    });

    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
    };

    const columns = [
      { header: "ID", accessor: "customerId", render: (val) => <span className="font-semibold text-primary">{val}</span> },
      { header: "Pasien", accessor: "customerName", render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className={`size-8 rounded-full flex items-center justify-center text-[11px] font-semibold ${row.gender === 'Perempuan' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>
            {val.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-[13px] font-medium text-text-primary">{val}</p>
            <p className="text-[11px] text-text-secondary">{row.email}</p>
          </div>
        </div>
      )},
      { header: "Gender", accessor: "gender", render: (val) => (
          <span className="text-[12px]">{val}</span>
      )},
      { header: "Kota", accessor: "city" },
      { header: "Membership", accessor: "loyalty", render: (val) => (
        <Badge variant={val === 'Gold' ? 'warning' : val === 'Silver' ? 'neutral' : 'info'}>
          {val}
        </Badge>
      )},
      { header: "Total Transaksi", accessor: "totalTransaction", render: (val) => (
          <span className="text-[13px] font-medium">{formatRupiah(val)}</span>
      )},
      { header: "Status", accessor: "status", render: (val) => (
          <Badge variant={val === 'Aktif' ? 'success' : 'error'}>{val}</Badge>
      )},
      { header: "Tgl Daftar", accessor: "joinDate", render: (val) => <span className="text-[12px] text-text-secondary">{val}</span> },
    ];

    const createNextCustomerId = (currentCustomers) => {
        const maxNumber = currentCustomers.reduce((acc, item) => {
            const match = String(item.customerId).match(/(\d+)$/);
            const n = match ? Number(match[1]) : 0;
            return Math.max(acc, n);
        }, 0);
        return `PAT-${(maxNumber + 1).toString().padStart(4, '0')}`;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const next = {
            ...form,
            customerId: createNextCustomerId(customers),
            joinDate: new Date().toISOString().split('T')[0],
            totalTransaction: 0,
            lastTransactionDate: "-",
            username: form.customerName.toLowerCase().replace(/\s/g, '') + Math.floor(Math.random() * 100)
        };
        setCustomers([next, ...customers]);
        setIsAddOpen(false);
        setForm({ customerName: "", email: "", phone: "", loyalty: "Bronze", gender: "Laki-laki", city: "Jakarta", status: "Aktif" });
    };

    const filteredCustomers = useMemo(() => {
        return customers.filter(c => {
            const matchesQuery = c.customerName.toLowerCase().includes(query.toLowerCase()) || 
                               c.email.toLowerCase().includes(query.toLowerCase()) ||
                               c.customerId.toLowerCase().includes(query.toLowerCase());
            const matchesLoyalty = filterLoyalty === "All" || c.loyalty === filterLoyalty;
            const matchesStatus = filterStatus === "All" || c.status === filterStatus;
            
            return matchesQuery && matchesLoyalty && matchesStatus;
        });
    }, [customers, query, filterLoyalty, filterStatus]);

    const handleExport = () => {
        // In a real app, this would trigger the download of customer_dummy_800.csv
        window.open('/customer_dummy_800.csv', '_blank');
    };

    return (
        <div id="customers-container" className="space-y-6">
            <PageHeader 
                title="Manajemen Pasien (CRM)" 
                subtitle="Kelola database pasien, membership, dan riwayat transaksi Apotek Sehat."
                breadcrumb={[
                    { label: "Dashboard", path: "/" },
                    { label: "CRM", path: "/customers" },
                    { label: "Pasien" }
                ]}
            >
                <div className="flex gap-2">
                    <Button variant="secondary" icon={Download} onClick={handleExport}>Export Excel</Button>
                    <Button icon={UserPlus} onClick={() => setIsAddOpen(true)}>Tambah Pasien</Button>
                </div>
            </PageHeader>

            {/* Stats Cards for CRM */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-[8px] border border-border-default shadow-sm">
                    <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Total Pasien</p>
                    <h3 className="text-2xl font-bold text-text-primary mt-1">{customers.length}</h3>
                </div>
                <div className="bg-white p-4 rounded-[8px] border border-border-default shadow-sm">
                    <p className="text-[11px] font-bold text-success uppercase tracking-wider">Aktif</p>
                    <h3 className="text-2xl font-bold text-text-primary mt-1">{customers.filter(c => c.status === 'Aktif').length}</h3>
                </div>
                <div className="bg-white p-4 rounded-[8px] border border-border-default shadow-sm">
                    <p className="text-[11px] font-bold text-warning uppercase tracking-wider">Gold Member</p>
                    <h3 className="text-2xl font-bold text-text-primary mt-1">{customers.filter(c => c.loyalty === 'Gold').length}</h3>
                </div>
                <div className="bg-white p-4 rounded-[8px] border border-border-default shadow-sm">
                    <p className="text-[11px] font-bold text-primary uppercase tracking-wider">Baru (Bulan Ini)</p>
                    <h3 className="text-2xl font-bold text-text-primary mt-1">24</h3>
                </div>
            </div>

            <div className="bg-white rounded-[8px] border border-border-default shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border-default flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="text-[12px] font-bold text-text-secondary mb-1 block">Cari Pasien</label>
                        <SearchInput 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari ID, Nama, atau Email..." 
                            className="w-full"
                        />
                    </div>
                    <div className="w-full md:w-[180px]">
                        <SelectDropdown 
                            label="Level Membership"
                            value={filterLoyalty}
                            onChange={(e) => setFilterLoyalty(e.target.value)}
                            options={[
                                { label: "Semua Level", value: "All" },
                                { label: "Gold", value: "Gold" },
                                { label: "Silver", value: "Silver" },
                                { label: "Bronze", value: "Bronze" },
                            ]}
                        />
                    </div>
                    <div className="w-full md:w-[180px]">
                        <SelectDropdown 
                            label="Status"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            options={[
                                { label: "Semua Status", value: "All" },
                                { label: "Aktif", value: "Aktif" },
                                { label: "Tidak Aktif", value: "Tidak Aktif" },
                            ]}
                        />
                    </div>
                </div>
                <DataTable 
                    columns={columns} 
                    data={filteredCustomers} 
                    onEdit={(row) => console.log('Edit', row)}
                    onDelete={(row) => console.log('Delete', row)}
                />
            </div>

            <Modal 
              isOpen={isAddOpen} 
              onClose={() => setIsAddOpen(false)}
              title="Tambah Pasien Baru"
              footer={
                <>
                  <Button variant="ghost" onClick={() => setIsAddOpen(false)}>Batal</Button>
                  <Button onClick={onSubmit}>Daftarkan Pasien</Button>
                </>
              }
            >
                <form className="space-y-4">
                    <InputField 
                        label="Nama Lengkap" 
                        value={form.customerName} 
                        onChange={(e) => setForm({...form, customerName: e.target.value})}
                        placeholder="Nama lengkap pasien"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <InputField 
                            label="Email" 
                            type="email"
                            value={form.email} 
                            onChange={(e) => setForm({...form, email: e.target.value})}
                            placeholder="email@contoh.com"
                        />
                        <InputField 
                            label="No. Telepon" 
                            value={form.phone} 
                            onChange={(e) => setForm({...form, phone: e.target.value})}
                            placeholder="0812..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <SelectDropdown 
                            label="Jenis Kelamin" 
                            value={form.gender}
                            onChange={(e) => setForm({...form, gender: e.target.value})}
                            options={[
                                { label: "Laki-laki", value: "Laki-laki" },
                                { label: "Perempuan", value: "Perempuan" },
                            ]}
                        />
                        <SelectDropdown 
                            label="Membership" 
                            value={form.loyalty}
                            onChange={(e) => setForm({...form, loyalty: e.target.value})}
                            options={[
                                { label: "Bronze", value: "Bronze" },
                                { label: "Silver", value: "Silver" },
                                { label: "Gold", value: "Gold" },
                            ]}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField 
                            label="Kota" 
                            value={form.city} 
                            onChange={(e) => setForm({...form, city: e.target.value})}
                            placeholder="Contoh: Jakarta"
                        />
                        <SelectDropdown 
                            label="Status Awal" 
                            value={form.status}
                            onChange={(e) => setForm({...form, status: e.target.value})}
                            options={[
                                { label: "Aktif", value: "Aktif" },
                                { label: "Tidak Aktif", value: "Tidak Aktif" },
                            ]}
                        />
                    </div>
                </form>
            </Modal>
        </div>
    );
}
