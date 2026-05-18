import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/ui/DataTable";
import SearchInput from "../../components/ui/SearchInput";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { UserPlus } from "lucide-react";
import suppliers from "./suppliers.json";

export default function Suppliers() {
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return suppliers;
        return suppliers.filter((item) => {
            const haystack = `${item.name} ${item.code} ${item.city} ${item.phone} ${item.status}`.toLowerCase();
            return haystack.includes(q);
        });
    }, [query]);

    const columns = [
        { 
            header: "Nama Pemasok", 
            accessor: "name", 
            render: (val, row) => (
                <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-semibold text-slate-500">
                        {val.charAt(0)}
                    </div>
                    <Link to={`/suppliers/${row.id}`} className="text-primary font-semibold hover:underline">
                        {val}
                    </Link>
                </div>
            )
        },
        { header: "Kode", accessor: "code" },
        { header: "Kota", accessor: "city" },
        { header: "No. Telepon", accessor: "phone" },
        { 
            header: "Status", 
            accessor: "status", 
            render: (val) => (
                <Badge variant={val === 'Active' ? 'success' : 'error'}>
                    {val === 'Active' ? 'Aktif' : 'Nonaktif'}
                </Badge>
            )
        },
        { header: "Pengiriman Terakhir", accessor: "lastDelivery" },
    ];

    return (
        <div id="suppliers-container" className="space-y-6">
            <PageHeader 
                title="Manajemen Pemasok" 
                subtitle="Kelola data pemasok obat dan alat kesehatan."
                breadcrumb={[
                    { label: "Dashboard", path: "/" },
                    { label: "Manajemen Kontak", path: "/suppliers" },
                    { label: "Pemasok" }
                ]}
            >
                <Button icon={UserPlus}>Tambah Pemasok</Button>
            </PageHeader>

            <div className="bg-white rounded-[8px] border border-border-default shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border-default">
                    <SearchInput 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari pemasok berdasarkan nama, kode, atau kota..."
                        className="max-w-md"
                    />
                </div>
                <DataTable 
                    columns={columns} 
                    data={filtered} 
                    onEdit={(row) => console.log('Edit', row)}
                    onDelete={(row) => console.log('Delete', row)}
                />
            </div>
        </div>
    );
}
