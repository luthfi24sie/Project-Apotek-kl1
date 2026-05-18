import React from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/ui/StatCard";
import Button from "../../components/ui/Button";
import { Package, Hash, Layers, ShoppingBag, Trash2 } from "lucide-react";
import medicines from "./medicines.json";

export default function MedicineDetail() {
    const { id } = useParams();
    const medicine = medicines.find((item) => String(item.id) === String(id));

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
                <div className="bg-white rounded-[8px] border border-border-default p-10 text-center">
                    <h2 className="text-[18px] font-semibold text-text-primary mb-2">Obat tidak ditemukan</h2>
                    <p className="text-text-secondary mb-6">ID: {id}</p>
                    <Button as={Link} to="/medicines">Kembali ke Daftar Obat</Button>
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
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Medicine Info Card */}
                <div className="bg-white rounded-[8px] border border-border-default p-6 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-border-default">
                        <div className="size-10 rounded-[6px] bg-slate-100 flex items-center justify-center text-slate-500">
                            <Package size={20} />
                        </div>
                        <div>
                            <h3 className="text-[16px] font-semibold text-text-primary">Informasi Obat</h3>
                            <p className="text-[13px] text-text-secondary">Detail identitas produk</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">ID Obat</p>
                            <p className="text-[14px] font-medium text-text-primary mt-1">{medicine.code}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Grup Obat</p>
                            <p className="text-[14px] font-medium text-text-primary mt-1">{medicine.category}</p>
                        </div>
                    </div>
                </div>

                {/* Inventory Card */}
                <div className="bg-white rounded-[8px] border border-border-default p-6 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-border-default">
                        <div className="size-10 rounded-[6px] bg-slate-100 flex items-center justify-center text-slate-500">
                            <Layers size={20} />
                        </div>
                        <div>
                            <h3 className="text-[16px] font-semibold text-text-primary">Stok Inventaris</h3>
                            <p className="text-[13px] text-text-secondary">Informasi ketersediaan stok</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Pasokan</p>
                            <p className="text-[14px] font-medium text-text-primary mt-1">200</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Terjual</p>
                            <p className="text-[14px] font-medium text-text-primary mt-1">156</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Sisa Stok</p>
                            <p className="text-[14px] font-bold text-primary mt-1">{medicine.stock}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Usage Section */}
            <div className="bg-white rounded-[8px] border border-border-default p-6">
                <h3 className="text-[16px] font-semibold text-text-primary mb-4">Cara Penggunaan</h3>
                <p className="text-[13px] text-text-secondary leading-relaxed">
                    {medicine.usage || "Gunakan sesuai petunjuk dokter. Biasanya diminum 2-3 kali sehari sesudah makan."}
                </p>
            </div>

            {/* Side Effects Section */}
            <div className="bg-white rounded-[8px] border border-border-default p-6">
                <h3 className="text-[16px] font-semibold text-text-primary mb-4">Efek Samping</h3>
                <p className="text-[13px] text-text-secondary leading-relaxed">
                    {medicine.sideEffects || "Dapat menyebabkan kantuk, mual, atau pusing pada beberapa orang."}
                </p>
            </div>

            {/* Actions */}
            <div className="flex justify-start">
                <Button variant="danger" icon={Trash2}>Hapus Obat</Button>
            </div>
        </div>
    );
}
