import React, { useMemo, useState } from 'react';
import { Plus, Search, FileText, Calendar } from 'lucide-react';
import Button from "../../components/ui/Button";
import DataTable from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import InputField from "../../components/ui/InputField";
import SelectDropdown from "../../components/ui/SelectDropdown";
import PageHeader from "../../components/PageHeader";
import SearchInput from "../../components/ui/SearchInput";

export default function Orders() {
    const initialOrders = useMemo(() => ([
        { orderId: "RX-7721", patientName: "Budi Santoso", status: "Selesai", totalPrice: 125000, orderDate: "2026-05-10" },
        { orderId: "RX-7722", patientName: "Siti Aminah", status: "Diproses", totalPrice: 78000, orderDate: "2026-05-11" },
        { orderId: "RX-7723", patientName: "Andi Wijaya", status: "Batal", totalPrice: 56000, orderDate: "2026-05-11" },
        { orderId: "RX-7724", patientName: "Dewi Lestari", status: "Selesai", totalPrice: 214000, orderDate: "2026-05-12" },
        { orderId: "RX-7725", patientName: "Rizky Pratama", status: "Diproses", totalPrice: 99000, orderDate: "2026-05-12" },
        { orderId: "RX-7726", patientName: "Nabila Putri", status: "Selesai", totalPrice: 143000, orderDate: "2026-05-13" },
        { orderId: "RX-7727", patientName: "Ahmad Fauzi", status: "Batal", totalPrice: 67000, orderDate: "2026-05-13" },
        { orderId: "RX-7728", patientName: "Intan Permata", status: "Diproses", totalPrice: 159000, orderDate: "2026-05-14" },
        { orderId: "RX-7729", patientName: "Dimas Saputra", status: "Selesai", totalPrice: 88000, orderDate: "2026-05-14" },
        { orderId: "RX-7730", patientName: "Putri Aulia", status: "Diproses", totalPrice: 132000, orderDate: "2026-05-15" },
    ]), []);

    const [orders, setOrders] = useState(initialOrders);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [form, setForm] = useState({
        patientName: "",
        status: "Diproses",
        totalPrice: "",
        orderDate: "",
    });

    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
    };

    const columns = [
      { header: "No. Resep", accessor: "orderId", render: (val) => <span className="font-semibold text-primary">{val}</span> },
      { header: "Nama Pasien", accessor: "patientName", render: (val) => (
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-semibold text-slate-500">
            {val.charAt(0)}
          </div>
          <span className="text-[13px] font-medium text-text-primary">{val}</span>
        </div>
      )},
      { header: "Status", accessor: "status", render: (val) => (
        <Badge variant={val === 'Selesai' ? 'success' : val === 'Diproses' ? 'info' : 'error'}>
          {val}
        </Badge>
      )},
      { header: "Total Biaya", accessor: "totalPrice", render: (val) => <span className="text-[13px] font-medium text-text-primary">{formatRupiah(val)}</span> },
      { header: "Tanggal", accessor: "orderDate", render: (val) => <span className="text-[13px] text-text-secondary">{val}</span> },
    ];

    const createNextOrderId = (currentOrders) => {
        const maxNumber = currentOrders.reduce((acc, item) => {
            const match = String(item.orderId).match(/(\d+)$/);
            const n = match ? Number(match[1]) : 0;
            return Math.max(acc, n);
        }, 0);
        return `RX-${maxNumber + 1}`;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const next = {
            orderId: createNextOrderId(orders),
            patientName: form.patientName,
            status: form.status,
            totalPrice: Number(form.totalPrice),
            orderDate: form.orderDate,
        };
        setOrders([next, ...orders]);
        setIsAddOpen(false);
        setForm({ patientName: "", status: "Diproses", totalPrice: "", orderDate: "" });
    };

    const filteredOrders = useMemo(() => {
        return orders.filter(o => 
            o.patientName.toLowerCase().includes(query.toLowerCase()) || 
            o.orderId.toLowerCase().includes(query.toLowerCase())
        );
    }, [orders, query]);

    return (
        <div id="orders-container" className="space-y-6">
            <PageHeader 
                title="Transaksi Resep" 
                subtitle="Daftar semua transaksi dan resep masuk di Apotek."
                breadcrumb={[
                    { label: "Dashboard", path: "/" },
                    { label: "Transaksi" }
                ]}
            >
                <Button icon={Plus} onClick={() => setIsAddOpen(true)}>Input Resep Baru</Button>
            </PageHeader>
            
            <div className="bg-white rounded-[8px] border border-border-default shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border-default">
                    <SearchInput 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari resep atau pasien..." 
                        className="max-w-md"
                    />
                </div>
                <DataTable 
                    columns={columns} 
                    data={filteredOrders} 
                    onEdit={(row) => console.log('Edit', row)}
                    onDelete={(row) => console.log('Delete', row)}
                />
            </div>

            <Modal 
                isOpen={isAddOpen} 
                onClose={() => setIsAddOpen(false)} 
                title="Input Resep Baru"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsAddOpen(false)}>Batal</Button>
                        <Button onClick={onSubmit}>Simpan Transaksi</Button>
                    </>
                }
            >
                <form className="space-y-4">
                    <InputField 
                        label="Nama Pasien" 
                        value={form.patientName} 
                        onChange={(e) => setForm({...form, patientName: e.target.value})}
                        placeholder="Masukkan nama pasien"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <SelectDropdown 
                            label="Status" 
                            value={form.status}
                            onChange={(e) => setForm({...form, status: e.target.value})}
                            options={[
                                { label: "Diproses", value: "Diproses" },
                                { label: "Selesai", value: "Selesai" },
                                { label: "Batal", value: "Batal" },
                            ]}
                        />
                        <InputField 
                            label="Total Biaya" 
                            type="number"
                            value={form.totalPrice}
                            onChange={(e) => setForm({...form, totalPrice: e.target.value})}
                            placeholder="Rp 0"
                        />
                    </div>
                    <InputField 
                        label="Tanggal Transaksi" 
                        type="date"
                        value={form.orderDate}
                        onChange={(e) => setForm({...form, orderDate: e.target.value})}
                    />
                </form>
            </Modal>
        </div>
    );
}
