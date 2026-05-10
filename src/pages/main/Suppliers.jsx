import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
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

    const statusClass = (status) => {
        if (status === "Active") return "text-hijau bg-hijau/10";
        return "text-red-600 bg-red-50";
    };

    return (
        <div id="suppliers-container" className="pb-10">
            <PageHeader title="Suppliers" breadcrumb={["Dashboard", "Supplier List"]} />

            <div className="px-5 mt-4">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50">
                        <div className="flex flex-col gap-3">
                            <div>
                                <h2 className="text-xl font-bold text-teks">Daftar Supplier</h2>
                                <p className="text-sm text-gray-400 font-medium">Total data: {filtered.length}</p>
                            </div>
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Cari supplier..."
                                className="border border-gray-100 p-3 rounded-xl outline-none focus:border-hijau transition-all w-full max-w-xl"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-hijau">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">#</th>
                                    <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">Code</th>
                                    <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">City</th>
                                    <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">Last Delivery</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-gray-500">{index + 1}.</td>
                                        <td className="px-6 py-4">
                                            <Link to={`/suppliers/${item.id}`} className="text-hijau font-bold hover:underline">
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-500">{item.code}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-500">{item.city}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-500">{item.phone}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusClass(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-500">{item.lastDelivery}</td>
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
