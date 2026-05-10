import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import medicines from "./medicines.json";

export default function Medicines() {
    const [query, setQuery] = useState("");

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

    return (
        <div id="medicines-container" className="pb-10">
            <PageHeader title="Medicines" breadcrumb={["Dashboard", "Medicine List"]} />

            <div className="px-5 mt-4">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50">
                        <div className="flex flex-col gap-3">
                            <div>
                                <h2 className="text-xl font-bold text-teks">Daftar Obat</h2>
                                <p className="text-sm text-gray-400 font-medium">Total data: {filtered.length}</p>
                            </div>
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Cari obat..."
                                className="border border-gray-100 p-3 rounded-xl outline-none focus:border-hijau transition-all w-full max-w-xl"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-hijau">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">#</th>
                                    <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">Medicine</th>
                                    <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">Code</th>
                                    <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">Brand</th>
                                    <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">Stock</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-gray-500">{index + 1}.</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center ${visualClass(item)}`}>
                                                    {iconFor(item, "w-5 h-5")}
                                                </div>
                                                <Link to={`/medicines/${item.id}`} className="text-hijau font-bold hover:underline">
                                                    {item.name}
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-500">{item.code}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-500">{item.category}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-500">{item.brand}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-teks">{formatRupiah(item.price)}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-teks">{item.stock}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
