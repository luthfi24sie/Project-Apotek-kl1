import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/ui/DataTable";
import SearchInput from "../../components/ui/SearchInput";
import Button from "../../components/ui/Button";
import { Plus } from "lucide-react";
import medicines from "./medicines.json";

export default function Medicines() {
    const [query, setQuery] = useState("");

    const fallbackImageUrl = (item) => {
        const text = encodeURIComponent(item?.name || item?.code || "Medicine");
        return `https://dummyjson.com/image/80x80?text=${text}`;
    };

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return medicines;
        return medicines.filter((item) => {
            const haystack = `${item.name} ${item.code} ${item.category} ${item.brand}`.toLowerCase();
            return haystack.includes(q);
        });
    }, [query]);

    const formatRupiah = (value) => {
        const numberValue = typeof value === "number" ? value : Number(value);
        if (!Number.isFinite(numberValue)) return "-";
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(numberValue);
    };

    const columns = [
        { 
            header: "Obat", 
            accessor: "name", 
            render: (val, row) => (
                <div className="flex items-center gap-3">
                    <img
                        src={row.image}
                        alt={val}
                        className="w-10 h-10 rounded-[6px] object-cover border border-border-default"
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = fallbackImageUrl(row);
                        }}
                    />
                    <Link to={`/medicines/${row.id}`} className="text-primary font-semibold hover:underline">
                        {val}
                    </Link>
                </div>
            )
        },
        { header: "Kode", accessor: "code" },
        { header: "Kategori", accessor: "category" },
        { header: "Merek", accessor: "brand" },
        { header: "Harga", accessor: "price", render: (val) => formatRupiah(val) },
        { header: "Stok", accessor: "stock" },
    ];

    return (
        <div id="medicines-container" className="space-y-6">
            <PageHeader 
                title="Daftar Obat" 
                subtitle="Kelola stok dan informasi obat di apotek."
                breadcrumb={[
                    { label: "Dashboard", path: "/" },
                    { label: "Daftar Obat" }
                ]}
            >
                <Button icon={Plus}>Tambah Obat</Button>
            </PageHeader>

            <div className="bg-white rounded-[8px] border border-border-default shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border-default">
                    <SearchInput 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari obat berdasarkan nama, kode, atau kategori..."
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
