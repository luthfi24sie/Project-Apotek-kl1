import React from "react";
import { FileText, CheckCircle, Clock, Truck } from "lucide-react";

export default function MemberOrders() {
    const orders = [
        {
            id: "PS-2026-001",
            date: "28 Juni 2026",
            status: "Selesai",
            total: "Rp 150.000",
            items: ["Paracetamol 500mg", "Vitamin C"],
            icon: CheckCircle,
            color: "text-green-600 bg-green-100"
        },
        {
            id: "PS-2026-002",
            date: "25 Juni 2026",
            status: "Diproses",
            total: "Rp 75.000",
            items: ["Obat Batuk"],
            icon: Clock,
            color: "text-yellow-600 bg-yellow-100"
        },
        {
            id: "PS-2026-003",
            date: "20 Juni 2026",
            status: "Dikirim",
            total: "Rp 200.000",
            items: ["Amoxicillin", "Multivitamin"],
            icon: Truck,
            color: "text-purple-600 bg-purple-100"
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                    Riwayat Pesanan
                </h1>
                <p className="text-slate-600">
                    Lihat semua riwayat transaksi Anda di Apotek Sehat.
                </p>
            </div>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white p-6 rounded-xl border border-border-default shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <FileText className="text-slate-500 size-4" />
                                    <span className="font-semibold text-slate-900">{order.id}</span>
                                    <span className="text-slate-400 text-sm">• {order.date}</span>
                                </div>
                                <p className="text-slate-600 text-sm mb-2">
                                    Produk: {order.items.join(", ")}
                                </p>
                                <p className="text-lg font-bold text-slate-900">
                                    {order.total}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-lg ${order.color}`}>
                                    <order.icon size={20} />
                                </div>
                                <span className="font-medium text-slate-900">{order.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
