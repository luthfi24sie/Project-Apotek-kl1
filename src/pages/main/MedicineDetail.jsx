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

    return (
        <div id="medicine-detail-container" className="pb-10">
            <PageHeader title="Medicine Detail" breadcrumb={["Dashboard", "Medicines", String(medicine.id)]}>
                <Link to="/medicines" className="bg-hijau text-white px-4 py-2 rounded-lg font-bold">
                    Back
                </Link>
            </PageHeader>

            <div className="px-5 mt-4">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 max-w-2xl mx-auto">
                    <img
                        src={medicine.image}
                        alt={medicine.name}
                        className="rounded-2xl mb-5 w-full h-64 object-cover border border-gray-100"
                        loading="lazy"
                    />
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
