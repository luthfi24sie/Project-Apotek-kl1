import React, { useState, useMemo } from 'react';
import { Search, UserPlus } from 'lucide-react';
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
    const [form, setForm] = useState({
        customerName: "",
        email: "",
        phone: "",
        loyalty: "Bronze",
    });

    const columns = [
      { header: "ID Pasien", accessor: "customerId", render: (val) => <span className="font-semibold text-primary">{val}</span> },
      { header: "Nama Pasien", accessor: "customerName", render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-semibold text-slate-500">
            {val.charAt(0)}
          </div>
          <div>
            <p className="text-[13px] font-medium text-text-primary">{val}</p>
            <p className="text-[11px] text-text-secondary">{row.email}</p>
          </div>
        </div>
      )},
      { header: "Kontak", accessor: "phone", render: (val) => <span className="text-[13px] text-text-primary">{val}</span> },
      { header: "Loyalty", accessor: "loyalty", render: (val) => (
        <Badge variant={val === 'Gold' ? 'warning' : val === 'Silver' ? 'neutral' : 'info'}>
          {val}
        </Badge>
      )},
    ];

    const createNextCustomerId = (currentCustomers) => {
        const maxNumber = currentCustomers.reduce((acc, item) => {
            const match = String(item.customerId).match(/(\d+)$/);
            const n = match ? Number(match[1]) : 0;
            return Math.max(acc, n);
        }, 0);
        return `PAT-${String(maxNumber + 1).padStart(4, "0")}`;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const next = {
            customerId: createNextCustomerId(customers),
            customerName: form.customerName,
            email: form.email,
            phone: form.phone,
            loyalty: form.loyalty,
        };
        setCustomers([next, ...customers]);
        setIsAddOpen(false);
        setForm({ customerName: "", email: "", phone: "", loyalty: "Bronze" });
    };

    const filteredCustomers = useMemo(() => {
        return customers.filter(c => 
            c.customerName.toLowerCase().includes(query.toLowerCase()) || 
            c.email.toLowerCase().includes(query.toLowerCase()) ||
            c.phone.toLowerCase().includes(query.toLowerCase())
        );
    }, [customers, query]);

    return (
        <div id="customers-container" className="space-y-6">
            <PageHeader 
                title="Pasien & Pelanggan" 
                subtitle="Kelola data pasien CRM Apotek Sehat."
                breadcrumb={[
                    { label: "Dashboard", path: "/" },
                    { label: "Manajemen Kontak", path: "/customers" },
                    { label: "Pasien" }
                ]}
            >
                <Button icon={UserPlus} onClick={() => setIsAddOpen(true)}>Tambah Pasien</Button>
            </PageHeader>

            <div className="bg-white rounded-[8px] border border-border-default shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border-default">
                    <SearchInput 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari nama, email, atau no. telepon..." 
                        className="max-w-md"
                    />
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
                        label="Nama Pasien" 
                        value={form.customerName} 
                        onChange={(e) => setForm({...form, customerName: e.target.value})}
                        placeholder="Nama lengkap pasien"
                    />
                    <InputField 
                        label="Email" 
                        type="email"
                        value={form.email} 
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        placeholder="email@contoh.com"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <InputField 
                            label="No. Telepon" 
                            value={form.phone} 
                            onChange={(e) => setForm({...form, phone: e.target.value})}
                            placeholder="0812..."
                        />
                        <SelectDropdown 
                            label="Loyalty" 
                            value={form.loyalty}
                            onChange={(e) => setForm({...form, loyalty: e.target.value})}
                            options={[
                                { label: "Bronze", value: "Bronze" },
                                { label: "Silver", value: "Silver" },
                                { label: "Gold", value: "Gold" },
                            ]}
                        />
                    </div>
                </form>
            </Modal>
        </div>
    );
}
