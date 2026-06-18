import React from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/ui/StatCard";
import Button from "../../components/ui/Button";
import { Package, Hash, Layers, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import medicines from "./medicines.json";

export default function MedicineDetail() {
    const { darkMode } = useOutletContext();
    const { id } = useParams();
    const medicine = medicines.find((item) => String(item.id) === String(id));

    const fallbackImageUrl = (item) => {
        const text = encodeURIComponent(item?.name || item?.code || "Medicine");
        return `https://dummyjson.com/image/400x300?text=${text}`;
    };

    if (!medicine) {
        return (
            <div id="medicine-detail-container" className="space-y-6">
                <PageHeader 
                    title="Detail Obat" 
                    breadcrumb={[
                        { label: "Dashboard", path: "/" },
                        { label: "Daftar Obat", path: "/medicines" },
                        { label: "Tidak Ditemukan" }
                    ]} 
                />
                <div className={`rounded-[8px] border p-10 text-center ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-border-default"}`}>
                    <h2 className={`text-[18px] font-semibold mb-2 ${darkMode ? "text-white" : "text-text-primary"}`}>Obat tidak ditemukan</h2>
                    <p className={`mb-6 ${darkMode ? "text-slate-400" : "text-text-secondary"}`}>ID: {id}</p>
                    <Button as={Link} to="/medicines" icon={ArrowLeft}>Kembali ke Daftar Obat</Button>
                </div>
            </div>
        );
    }

    return (
        <div id="medicine-detail-container" className="space-y-6">
            <PageHeader 
                title={medicine.name}
                breadcrumb={[
                    { label: "Dashboard", path: "/" },
                    { label: "Inventaris", path: "/medicines" },
                    { label: "Daftar Obat", path: "/medicines" },
                    { label: medicine.name }
                ]}
            >
                <Button as={Link} to="/medicines" variant="ghost" icon={ArrowLeft}>Kembali</Button>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`rounded-[8px] border p-6 ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-border-default"}`}>
                    <img 
                        src={medicine.image}
                        alt={medicine.name}
                        className="w-full rounded-lg object-cover h-64 border border-border-default dark:border-slate-700 mb-4"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = fallbackImageUrl(medicine);
                        }}
                    />
                    <h2 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-text-primary"}`}>{medicine.name}</h2>
                    <p className={`text-sm mb-4 ${darkMode ? "text-slate-400" : "text-text-secondary"}`}>{medicine.brand}</p>
                    <div className="flex items-center gap-2">
                        <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                            Rp {medicine.price.toLocaleString("id-ID")}
                        </span>
                        <span className={`text-sm font-medium px-3 py-1 rounded-full border ${darkMode ? "border-slate-700 text-slate-300" : "border-border-default text-text-secondary"}`}>
                            Stok: {medicine.stock}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className={`rounded-[8px] border p-6 ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-border-default"}`}>
                        <div className="flex items-center gap-3 pb-4 border-b border-border-default dark:border-slate-700">
                            <div className={`size-10 rounded-[6px] flex items-center justify-center ${darkMode ? "bg-slate-700 text-slate-400" : "bg-slate-100 text-slate-500"}`}>
                                <Package size={20} />
                            </div>
                            <div>
                                <h3 className={`text-[16px] font-semibold ${darkMode ? "text-white" : "text-text-primary"}`}>Informasi Obat</h3>
                                <p className={`text-[13px] ${darkMode ? "text-slate-400" : "text-text-secondary"}`}>Detail identitas produk</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className={`text-[11px] font-semibold uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-text-muted"}`}>ID Obat</p>
                                <p className={`text-[14px] font-medium mt-1 ${darkMode ? "text-white" : "text-text-primary"}`}>{medicine.code}</p>
                            </div>
                            <div>
                                <p className={`text-[11px] font-semibold uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-text-muted"}`}>Kategori</p>
                                <p className={`text-[14px] font-medium mt-1 ${darkMode ? "text-white" : "text-text-primary"}`}>{medicine.category}</p>
                            </div>
                        </div>
                    </div>

                    <div className={`rounded-[8px] border p-6 ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-border-default"}`}>
                        <div className="flex items-center gap-3 pb-4 border-b border-border-default dark:border-slate-700">
                            <div className={`size-10 rounded-[6px] flex items-center justify-center ${darkMode ? "bg-slate-700 text-slate-400" : "bg-slate-100 text-slate-500"}`}>
                                <Layers size={20} />
                            </div>
                            <div>
                                <h3 className={`text-[16px] font-semibold ${darkMode ? "text-white" : "text-text-primary"}`}>Stok</h3>
                                <p className={`text-[13px] ${darkMode ? "text-slate-400" : "text-text-secondary"}`}>Sisa {medicine.stock}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`rounded-[8px] border p-6 ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-border-default"}`}>
                <h3 className={`text-[16px] font-semibold mb-4 ${darkMode ? "text-white" : "text-text-primary"}`}>Deskripsi</h3>
                <p className={`text-[13px] leading-relaxed ${darkMode ? "text-slate-300" : "text-text-secondary"}`}>
                    {medicine.description}
                </p>
            </div>
        </div>
    );
}
