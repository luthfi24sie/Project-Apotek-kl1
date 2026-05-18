import React from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/ui/Button";
import { Package, MapPin, Phone, Activity, Clock, Trash2 } from "lucide-react";
import suppliers from "./suppliers.json";

export default function SupplierDetail() {
    const { id } = useParams();
    const supplier = suppliers.find((item) => String(item.id) === String(id));

    if (!supplier) {
        return (
            <div id="supplier-detail-container" className="space-y-6">
                <PageHeader 
                    title="Detail Pemasok" 
                    breadcrumb={[
                        { label: "Dashboard", path: "/" },
                        { label: "Manajemen Kontak", path: "/suppliers" },
                        { label: "Tidak Ditemukan" }
                    ]} 
                />
                <div className="bg-white rounded-[8px] border border-border-default p-10 text-center">
                    <h2 className="text-[18px] font-semibold text-text-primary mb-2">Pemasok tidak ditemukan</h2>
                    <p className="text-text-secondary mb-6">ID: {id}</p>
                    <Button as={Link} to="/suppliers">Kembali ke Daftar Pemasok</Button>
                </div>
            </div>
        );
    }

    return (
        <div id="supplier-detail-container" className="space-y-6">
            <PageHeader 
                title={supplier.name}
                breadcrumb={[
                    { label: "Dashboard", path: "/" },
                    { label: "Manajemen Kontak", path: "/suppliers" },
                    { label: "Pemasok", path: "/suppliers" },
                    { label: supplier.name }
                ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Supplier Basic Info Card */}
                <div className="bg-white rounded-[8px] border border-border-default p-6 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-border-default">
                        <div className="size-10 rounded-[6px] bg-slate-100 flex items-center justify-center text-slate-500">
                            <Package size={20} />
                        </div>
                        <div>
                            <h3 className="text-[16px] font-semibold text-text-primary">Profil Pemasok</h3>
                            <p className="text-[13px] text-text-secondary">Informasi dasar perusahaan</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Kode Pemasok</p>
                            <p className="text-[14px] font-medium text-text-primary mt-1">{supplier.code}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Kota Asal</p>
                            <div className="flex items-center gap-1.5 mt-1">
                                <MapPin size={14} className="text-text-muted" />
                                <p className="text-[14px] font-medium text-text-primary">{supplier.city}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact & Status Card */}
                <div className="bg-white rounded-[8px] border border-border-default p-6 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-border-default">
                        <div className="size-10 rounded-[6px] bg-slate-100 flex items-center justify-center text-slate-500">
                            <Phone size={20} />
                        </div>
                        <div>
                            <h3 className="text-[16px] font-semibold text-text-primary">Kontak & Status</h3>
                            <p className="text-[13px] text-text-secondary">Informasi komunikasi aktif</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Nomor Telepon</p>
                            <p className="text-[14px] font-medium text-text-primary mt-1">{supplier.phone}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Status</p>
                            <div className="flex items-center gap-1.5 mt-1">
                                <Activity size={14} className={supplier.status === 'Active' ? 'text-success' : 'text-error'} />
                                <p className="text-[14px] font-medium text-text-primary">{supplier.status === 'Active' ? 'Aktif' : 'Nonaktif'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delivery History Section */}
            <div className="bg-white rounded-[8px] border border-border-default p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Clock size={18} className="text-text-muted" />
                    <h3 className="text-[16px] font-semibold text-text-primary">Riwayat Pengiriman</h3>
                </div>
                <div className="p-4 bg-page-bg rounded-[6px] border border-border-default">
                    <p className="text-[13px] text-text-secondary">
                        Pengiriman terakhir diterima pada tanggal <span className="font-semibold text-text-primary">{supplier.lastDelivery}</span>.
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-start">
                <Button variant="danger" icon={Trash2}>Hapus Pemasok</Button>
            </div>
        </div>
    );
}
