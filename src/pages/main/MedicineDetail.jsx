import React from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import medicines from "./medicines.json";

export default function MedicineDetail() {
    const { id } = useParams();
    const medicine = medicines.find((item) => String(item.id) === String(id));

    if (!medicine) {
        return (
            <div id="medicine-detail-container" className="pb-10">
                <PageHeader title="Medicine Detail" breadcrumb={["Dashboard", "Medicines", "Not Found"]} />
                <div className="px-5 mt-4">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center">
                        <h2 className="text-2xl font-extrabold text-teks mb-2">Obat tidak ditemukan</h2>
                        <p className="text-gray-400 font-medium mb-6">ID: {id}</p>
                        <Link to="/medicines" className="inline-flex bg-hijau text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-colors">
                            Kembali ke Medicines
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const formatRupiah = (value) => {
        const numberValue = typeof value === "number" ? value : Number(value);
        if (!Number.isFinite(numberValue)) return "-";
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(numberValue);
    };

    const iconFor = (item, sizeClass) => {
        const name = String(item.name || "").toLowerCase();
        const category = String(item.category || "").toLowerCase();

        if (name.includes("thermometer")) {
            return (
                <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0Z" />
                    <line x1="12" y1="7" x2="12" y2="15" />
                </svg>
            );
        }

        if (name.includes("tensimeter")) {
            return (
                <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="7" width="8" height="10" rx="2" />
                    <path d="M11 12h4a4 4 0 0 1 4 4v1" />
                    <path d="M17 8h4v4" />
                </svg>
            );
        }

        if (category.includes("device")) {
            return (
                <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0Z" />
                    <line x1="12" y1="7" x2="12" y2="15" />
                </svg>
            );
        }

        if (category.includes("syrup") || category.includes("liquid")) {
            return (
                <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 3h6" />
                    <path d="M10 3v3l-2 3v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9l-2-3V3" />
                    <path d="M8 13h8" />
                </svg>
            );
        }

        if (category.includes("supply") || category.includes("sachet")) {
            return (
                <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 3h10v18H7z" />
                    <path d="M7 7h10" />
                    <path d="M9 12h6" />
                </svg>
            );
        }

        return (
            <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.5 6.5 6.5 10.5a4.5 4.5 0 1 0 6.4 6.4l4-4a4.5 4.5 0 0 0-6.4-6.4Z" />
                <path d="M8.2 8.8 15.2 15.8" />
            </svg>
        );
    };

    const visualClass = (item) => {
        const name = String(item.name || "").toLowerCase();
        const category = String(item.category || "").toLowerCase();
        if (name.includes("thermometer") || name.includes("tensimeter") || category.includes("device")) return "bg-blue-50 text-blue-600";
        if (category.includes("syrup") || category.includes("liquid")) return "bg-amber-50 text-amber-700";
        if (category.includes("supply") || category.includes("sachet")) return "bg-purple-50 text-purple-600";
        return "bg-emerald-50 text-emerald-600";
    };

    return (
        <div id="medicine-detail-container" className="pb-10">
            <PageHeader title="Medicine Detail" breadcrumb={["Dashboard", "Medicines", String(medicine.id)]}>
                <Link to="/medicines" className="bg-hijau text-white px-4 py-2 rounded-lg font-bold">
                    Back
                </Link>
            </PageHeader>

            <div className="px-5 mt-4">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 max-w-2xl mx-auto">
                    <div className={`rounded-2xl mb-5 w-full h-64 border border-gray-100 flex items-center justify-center ${visualClass(medicine)}`}>
                        {iconFor(medicine, "w-24 h-24")}
                    </div>
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-extrabold text-teks mb-1">{medicine.name}</h2>
                            <p className="text-sm text-gray-400 font-medium">{medicine.code}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Price</p>
                            <p className="text-teks font-extrabold text-lg">{formatRupiah(medicine.price)}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                        <div className="p-5 rounded-2xl border border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Category</p>
                            <p className="text-teks font-bold">{medicine.category}</p>
                        </div>
                        <div className="p-5 rounded-2xl border border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Brand</p>
                            <p className="text-teks font-bold">{medicine.brand}</p>
                        </div>
                        <div className="p-5 rounded-2xl border border-gray-100 md:col-span-2">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Stock</p>
                            <p className="text-teks font-bold">{medicine.stock}</p>
                        </div>
                        <div className="p-5 rounded-2xl border border-gray-100 md:col-span-2">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Description</p>
                            <p className="text-gray-500 font-medium">{medicine.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
